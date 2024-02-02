from fastapi import APIRouter, Query, HTTPException
from bs4 import BeautifulSoup
from Helper.Reply import Reply
import requests

router = APIRouter()

def crawl_data_from_anphatpc(laptop_name:str, page: int):
    URL = f"https://anphatpc.com.vn/tim?scat_id=&q={laptop_name}&page={page}"
    results = []
    try:
        r = requests.get(URL)
        soup = BeautifulSoup(r.text, 'lxml')
        p_text = soup.find_all("div", class_ = "p-text")
        for i in p_text:
            p_name = i.find('h3')
            p_price = i.find('span', class_='p-price')
            name = p_name.text.strip()
            price = p_price.text.strip()
            results.append({"name":name, "price":price})
        return Reply.make(True, 'Success', results)
    except requests.RequestException as e:
        return Reply.make(False, 'Failed', e)
    except Exception as e:
        return Reply.make(False, 'Failed', e)
