// script.js


  
  
  function renderTable(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = data.map(item => `
      <tr>
        <td>${item.governor}</td>
        <td>${item.state}</td>
        <td>${item.years_in_office}</td>
        <td>${item.sentiment}</td>
        <td><a href="${item.manifesto_link}" target="_blank">View</a></td>
      </tr>
    `).join("");
  }
  
  function sortData(data, key, ascending = true) {
    return data.sort((a, b) => {
      const valueA = a[key].toUpperCase();
      const valueB = b[key].toUpperCase();
      return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  }
  
  function addSortingListeners() {
    document.querySelectorAll("th[data-sort]").forEach(header => {
      let ascending = true;
      header.addEventListener("click", () => {
        const key = header.getAttribute("data-sort");
        const sortedData = sortData([...data], key, ascending);
        renderTable(sortedData);
        ascending = !ascending;
        document.querySelectorAll("th").forEach(h => h.classList.remove("sort-asc", "sort-desc"));
        header.classList.add(ascending ? "sort-asc" : "sort-desc");
      });
    });
  }
  
  function addSearchListener() {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredData = data.filter(item => 
        item.governor.toLowerCase().includes(searchTerm) ||
        item.state.toLowerCase().includes(searchTerm)
      );
      renderTable(filteredData);
    });
  }
  
  async function loadData() {
    try {
        const response = await fetch("./sentiment_analysis/governors_data_with_sentiment.json");
        if (!response.ok) throw new Error("Failed to load data.json");
        
        const data = await response.json();
        
        renderTable(data);
        addSortingListeners(data);
        addSearchListener(data);
        renderChart(data);
    } catch (error) {
        console.error("Error loading JSON file:", error);
    }
}

function renderChart(data) {
    const sentimentCount = {};
    data.forEach(item => {
        sentimentCount[item.sentiment] = (sentimentCount[item.sentiment] || 0) + 1;
    });
    
    const ctx = document.getElementById('sentimentChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(sentimentCount),
            datasets: [{
                label: 'Sentiment Distribution',
                data: Object.values(sentimentCount),
                backgroundColor: ['#2ecc71', '#f1c40f', '#e67e22', '#e74c3c']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}
loadData();
  