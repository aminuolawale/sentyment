from utils import SentimentHelper
from dotenv import load_dotenv

if __name__ == "__main__":
    load_dotenv()

    sentiment_helper = SentimentHelper("governors_data.json")
    sentiment_helper.execute()