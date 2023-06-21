from bs4 import BeautifulSoup as bs
import requests
from dataclasses import dataclass
from typing import List

@dataclass
class Company:
    name: str
    urls: List[str]

companies: List[Company] = [
    Company(name="Confinze", urls=["https://www.confinze.io/om-os"]),
    Company(name="Mindfuture", urls=["https://www.mindfuture.com/"]),
    Company(name="Zibra Partner Equity", urls=["https://zibrapartner.com/en/"]),
    Company(name="Lactobio", urls=["https://www.lactobio.com"]),
    Company(name="People Ventures", urls=["https://people.ventures/about"]),
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"
}
for company in companies:
    for url in company.urls:
        response = requests.get(url, headers=headers)
        soup = bs(response.content, "html.parser")
        text = soup.text.replace("\n", "")
        if company.name == "People Ventures":
            print(company.name, text)
