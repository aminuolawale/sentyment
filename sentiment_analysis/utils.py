import json
import requests
from datetime import datetime
from collections import defaultdict
from random import sample
from typing import Optional
import sys
from transformers import pipeline
import os
from search import SearchProvider
from collections import Counter


class SentimentHelper:
    def __init__(self, governor_data_file_name: str):
        self.governor_data_file_name = governor_data_file_name
        self.sentiment_pipeline = pipeline("sentiment-analysis")

    def execute(self):
        """

        Main function to execute the sentiment analysis and article collection.
        """
        self.get_governors_articles()
        self.merge_json_files(
            "governor_articles.json", self.governor_data_file_name, "governors_data_with_articles.json")
        self.do_sentiment_analysis()

    def do_sentiment_analysis(self) -> dict:
        sentiment_result_file_name = "sentiment_result.json"
        result_dict = defaultdict(list)
        sentiment_data = self.load_sentiment_results(
            "governors_data_with_articles.json")
        for governor in sentiment_data:
            name = governor["governor"]
            articles = governor["articles"]
            for article in articles:
                url = article["url"]
                main_text = SearchProvider.extract_main_text(url)
                if main_text:
                    sentiment_result = self._analyze_sentiment(main_text)
                    if sentiment_result:
                        result_dict[name].append(sentiment_result)
                else:
                    print(f"No text extracted from the article: {url}")

        # Save the sentiment results to a JSON file
        with open(sentiment_result_file_name, "w") as f:
            json.dump(result_dict, f, indent=4)
        print(f"Sentiment results saved to {sentiment_result_file_name}.")

        scored_sentiment = dict()
        for governor, sentiments in result_dict.items():
            stripped_sentiment = [sentiment[0] for sentiment in sentiments]
            score = Counter([sentiment["label"]
                            for sentiment in stripped_sentiment])
            sentiment = "NEUTRAL"
            if score["POSITIVE"] > score["NEGATIVE"]:
                sentiment = "POSITIVE"
            elif score["NEGATIVE"] > score["POSITIVE"]:
                sentiment = "NEGATIVE"
            scored_sentiment[governor] = sentiment
        with open(self.governor_data_file_name, "r") as file:
            data = json.load(file)
            result = []
            for governor in data:
                governor["sentiment"] = scored_sentiment.get(
                    governor["governor"], "NEUTRAL")
                result.append(governor)
        with open("governors_data_with_sentiment.json", "w") as file:
            json.dump(result, file, indent=4)
        print("Final output saved to governors_data_with_sentiment.json.")

    def get_governors_articles(self) -> dict:
        """
        Collects articles for each governor based on their name, state, and years in office."""
        cached_governors_articles = self._get_cached_governors_articles()
        if cached_governors_articles != None:
            print("Governor articles already collected. Skipping...")
            return cached_governors_articles
        print("Collecting articles for each governor...")
        governors_data = self.get_governors_data()
        all_articles = {}
        for governor in governors_data:
            name = governor["governor"]
            state = governor["state"]
            years = governor["years_in_office"].replace(
                "–present", f"–{datetime.now().year}")
            query = f"{name} {state} governor {years}  {self.get_news_search_filter()}"
            print(f"Searching for articles about {name}...")
            articles = SearchProvider(query).search_articles()
            print(f"Found {len(articles)} articles for {name}.")
            all_articles[name] = articles
        # Save the results to a JSON file
        output_file = "governor_articles.json"
        with open(output_file, "w") as f:
            json.dump(all_articles, f, indent=4)
        print(f"Articles saved to {output_file}.")
        return all_articles

    def get_governors_data(self) -> dict:
        """
        Loads the governors data from a JSON file."""
        with open(self.governor_data_file_name, "r") as file:
            data = json.load(file)
            return data

    def merge_json_files(self, governor_articles_file: str, governors_data_file: str, output_file: str) -> None:
        """
        Merges two JSON files based on the governor's name.

        Args:
            governor_articles_file (str): Path to the governor articles JSON file.
            governors_data_file (str): Path to the governors data JSON file.
            output_file (str): Path to save the merged JSON file.
        """
        if self._articles_are_merged():
            print("Articles already merged with governor data. Skipping...")
            return
        print("Merging JSON files...")
        with open(governor_articles_file, "r") as governor_articles, open(governors_data_file, "r") as governors_data:
            governor_articles = json.load(governor_articles)
            governors_data = json.load(governors_data)
            merged_data = []
            for data in governors_data:
                if data["governor"] in governor_articles:
                    data["articles"] = governor_articles[data["governor"]]
                else:
                    data["articles"] = []
                merged_data.append(data)
            with open(output_file, "w") as merged_file:
                json.dump(merged_data, merged_file, indent=4)
                print(f"Merged data saved to {merged_file.name}")

    def load_sentiment_results(self, sentiment_result_file_name: str) -> dict:
        """
        Loads the sentiment results from a JSON file."""
        with open(sentiment_result_file_name, "r") as file:
            data = json.load(file)
            return data

    def _get_cached_governors_articles(self) -> Optional[dict]:
        """
        Checks if the governor articles have already been collected."""
        try:
            with open("governor_articles.json", "r") as file:
                data = json.load(file)
                return data if any([len(value) > 0 for value in data.values()])else None
        except FileNotFoundError:
            return None

    def _articles_are_merged(self) -> bool:
        """
        Checks if the articles have already been merged with the governor data."""
        try:
            with open("governors_data_with_articles.json", "r") as file:
                merged_data = json.load(file)
                entries_with_articles = [
                    entry for entry in merged_data if len(entry["articles"]) > 0]
                if len(entries_with_articles) == 0:
                    return False
                random_entry = sample(entries_with_articles, 1)[0]
                random_entry_articles = random_entry["articles"]
                matching_entry_articles = self.get_governors_articles()[
                    random_entry["governor"]]
                return random_entry_articles == matching_entry_articles
        except FileNotFoundError:
            return False

    def get_news_search_filter(self) -> str:
        news_channels = [
            "punchng.com",
            "guardian.ng",
            "channelstv.com"
            "bbc.com",
            "legit.ng",
            "dailypost.ng",
            "vanguardngr.com",
            "aljazeera.com",
            "premiumtimesng.com",
            "pulseng.com",
            "theguardian.com",
        ]
        news_search_filter = " OR ".join(
            [f"site:{channel}" for channel in news_channels])
        return news_search_filter

    def _analyze_sentiment(self, text: str) -> Optional[dict]:
        try:
            # Analyze the sentiment of the text
            result = self.sentiment_pipeline(text)
            return result
        except Exception as e:
            print(f"Error analyzing sentiment: {e}", file=sys.stderr)
