import os
import sys
import requests
from datetime import datetime
from collections import defaultdict
from newspaper import Article
from typing import Optional
from transformers import pipeline
from random import sample
from dotenv import load_dotenv


class SearchProvider:
    def __init__(self, query: str):
        self.query = query
        self.search_provider =   SearchApiSearchProvider(query) if os.getenv("SEARCH_PROVIDER") == "searchapi" else BraveSearchProvider(query)
    
    def search_articles(self, count: int = 5):
        return self.search_provider.search_articles(count) if self.search_provider else []
    
    @classmethod
    def extract_main_text(cls, url: str) -> Optional[str]:
        """
        Extracts the main text from a given URL using newspaper3k."""
        try:
            article = Article(url)
            article.download()
            article.parse()
            return article.text
        except Exception as e:
            print(f"Error extracting article: {e}", file=sys.stderr)
            return None

class BraveSearchProvider:
    API_KEY = os.getenv("BRAVE_SEARCH_API_KEY")
    SEARCH_ENDPOINT = "https://api.search.brave.com/res/v1/web/search"
    
    def __init__(self, query: str):
        self.query = query
    
    
    def search_articles(self, count: int = 2):
        try:
            params = {
                "q": self.query,
                "search_lang": "en",
                "count": count,
            }
            headers = {"Accept": "application/json", "Accept-Encoding": "gzip", "X-Subscription-Token": self.get_api_key()}
            response = requests.get(self.get_search_endpoint(), params=params, headers=headers)
            response.raise_for_status()
            data = response.json().get("organic_results", [])
            return [
                {"title": article["title"], "url": article["link"]}
                for article in data
            ]
        except requests.exceptions.RequestException as e:
            print(f"Error fetching articles for '{self.query}': {e}")
            return []
        
    def get_api_key(self):
        return BraveSearchProvider.API_KEY
    

    def get_search_endpoint(self):
        return BraveSearchProvider.SEARCH_ENDPOINT


class SearchApiSearchProvider:
    API_KEY = os.getenv("SERP_API_KEY")
    SEARCH_ENDPOINT = "https://searchapi.io/api/v1/search?engine=google"
    
    def __init__(self, query: str):
        self.query = query
    
    
    def search_articles(self, count: int = 2):
        try:
            params = {
                "q": self.query,
                "hl": "en",
                "num": count,
                "api_key": self.get_api_key(),
                "tbm": "nws"
            }
            response = requests.get(self.get_search_endpoint(), params=params)
            response.raise_for_status()
            data = response.json().get("organic_results", [])
            return [
                {"title": article["title"], "url": article["link"]}
                for article in data
            ]
        except requests.exceptions.RequestException as e:
            print(f"Error fetching articles for '{self.query}': {e}")
            return []
        
    def get_api_key(self):
        return SearchApiSearchProvider.API_KEY
    

    def get_search_endpoint(self):
        return SearchApiSearchProvider.SEARCH_ENDPOINT

        