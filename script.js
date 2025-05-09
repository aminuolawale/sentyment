// script.js

const data = [
  {
    governor: "Alex Otti",
    state: "Abia",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://alexotti.com/manifesto"
  },
  {
    governor: "Ahmadu Umaru Fintiri",
    state: "Adamawa",
    years: "2019–present",
    sentiment: "Mixed to Positive",
    link: "https://adspc.ad.gov.ng/state-projects/?utm"
  },
  {
    governor: "Umo Eno",
    state: "Akwa Ibom",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://umoeno.com/manifesto"
  },
  {
    governor: "Charles Soludo",
    state: "Anambra",
    years: "2022–present",
    sentiment: "Positive",
    link: "https://www.anambrastate.gov.ng/manifesto"
  },
  {
    governor: "Bala Mohammed",
    state: "Bauchi",
    years: "2019–present",
    sentiment: "Positive",
    link: "https://balamohammed.com/manifesto"
  },
  {
    governor: "Douye Diri",
    state: "Bayelsa",
    years: "2020–present",
    sentiment: "Positive",
    link: "https://douyediri.com/manifesto"
  },
  {
    governor: "Hyacinth Alia",
    state: "Benue",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://hyacinthalia.com/manifesto"
  },
  {
    governor: "Babagana Zulum",
    state: "Borno",
    years: "2019–present",
    sentiment: "Positive",
    link: "https://www.bornostate.gov.ng/manifesto"
  },
  {
    governor: "Bassey Otu",
    state: "Cross River",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://basseyotu.com/manifesto"
  },
  {
    governor: "Sheriff Oborevwori",
    state: "Delta",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://sheriffoborevwori.com/manifesto"
  },
  {
    governor: "Francis Nwifuru",
    state: "Ebonyi",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://francisnwifuru.com/manifesto"
  },
  {
    governor: "Godwin Obaseki",
    state: "Edo",
    years: "2016–2024",
    sentiment: "Positive",
    link: "https://www.edostate.gov.ng/manifesto"
  },
  {
    governor: "Biodun Oyebanji",
    state: "Ekiti",
    years: "2022–present",
    sentiment: "Positive",
    link: "https://biodunoyebanji.com/manifesto"
  },
  {
    governor: "Peter Mbah",
    state: "Enugu",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://petermbah.com/manifesto"
  },
  {
    governor: "Muhammad Inuwa Yahaya",
    state: "Gombe",
    years: "2019–present",
    sentiment: "Positive",
    link: "https://inuwayahaya.com/manifesto"
  },
  {
    governor: "Hope Uzodinma",
    state: "Imo",
    years: "2020–present",
    sentiment: "Mixed",
    link: "https://hopeuzodinma.com/manifesto"
  },
  {
    governor: "Umar Namadi",
    state: "Jigawa",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://umarnamadi.com/manifesto"
  },
  {
    governor: "Uba Sani",
    state: "Kaduna",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://ubasani.com/manifesto"
  },
  {
    governor: "Abba Kabir Yusuf",
    state: "Kano",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://abbakabiryusuf.com/manifesto"
  },
  {
    governor: "Dikko Umaru Radda",
    state: "Katsina",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://dikkoradda.com/manifesto"
  },
  {
    governor: "Nasir Idris",
    state: "Kebbi",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://nasiridriskebbi.com/manifesto"
  },
  {
    governor: "Ahmed Usman Ododo",
    state: "Kogi",
    years: "2024–present",
    sentiment: "Positive",
    link: "https://ahmedododo.com/manifesto"
  },
  {
    governor: "AbdulRahman AbdulRazaq",
    state: "Kwara",
    years: "2019–present",
    sentiment: "Positive",
    link: "https://aa.gov.kw.gov.ng/manifesto"
  },
  {
    governor: "Babajide Sanwo-Olu",
    state: "Lagos",
    years: "2019–present",
    sentiment: "Positive",
    link: "https://sanwoolu.com/manifesto"
  },
  {
    governor: "Abdullahi Sule",
    state: "Nasarawa",
    years: "2019–present",
    sentiment: "Positive",
    link: "https://abdullahisule.com/manifesto"
  },
  {
    governor: "Mohammed Umar Bago",
    state: "Niger",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://mohammedbago.com/manifesto"
  },
  {
    governor: "Dapo Abiodun",
    state: "Ogun",
    years: "2019–present",
    sentiment: "Positive",
    link: "https://dapoabiodun.com/manifesto"
  },
  {
    governor: "Lucky Aiyedatiwa",
    state: "Ondo",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://luckyaiedatiwa.com/manifesto"
  },
  {
    governor: "Ademola Adeleke",
    state: "Osun",
    years: "2022–present",
    sentiment: "Positive",
    link: "https://ademolaadeleke.com/manifesto"
  },
  {
    governor: "Seyi Makinde",
    state: "Oyo",
    years: "2019–present",
    sentiment: "Positive",
    link: "https://seyimakinde.com/manifesto"
  },
  {
    governor: "Caleb Mutfwang",
    state: "Plateau",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://calebmutfwango.com/manifesto"
  },
  {
    governor: "Siminalayi Fubara",
    state: "Rivers",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://simfubara.com/manifesto"
  },
  {
    governor: "Ahmad Aliyu",
    state: "Sokoto",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://ahmadaliyu.com/manifesto"
  },
  {
    governor: "Agbu Kefas",
    state: "Taraba",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://agbukefas.com/manifesto"
  },
  {
    governor: "Mai Mala Buni",
    state: "Yobe",
    years: "2019–present",
    sentiment: "Positive",
    link: "https://maimalabuni.com/manifesto"
  },
  {
    governor: "Dauda Lawal",
    state: "Zamfara",
    years: "2023–present",
    sentiment: "Positive",
    link: "https://daudalawal.com/manifesto"
  }
];

  
  
  function renderTable(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = data.map(item => `
      <tr>
        <td>${item.governor}</td>
        <td>${item.state}</td>
        <td>${item.years}</td>
        <td>${item.sentiment}</td>
        <td><a href="${item.link}" target="_blank">View</a></td>
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
  
  // Initial rendering
  renderTable(data);
  addSortingListeners();
  addSearchListener();
  
  // Chart logic
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
  