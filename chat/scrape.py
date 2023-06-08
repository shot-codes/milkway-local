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
    Company(name="Lactobio", urls=["https://www.lactobio.com/pages/products#postbiotics"]),
    Company(name="People Ventures", urls=["https://people.ventures/operations"]),
]

for company in companies:
    for url in company.urls:
        response = requests.get(url)
        soup = bs(response.content, "html.parser")
        text = soup.text
        print(company.name, text)
