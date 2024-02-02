from fastapi import APIRouter, Query, HTTPException
from bs4 import BeautifulSoup
from Helper.Reply import Reply
import requests

router = APIRouter()

def crawl_data_from_trungtran(laptop_name:str, page: int):
    URL = f"https://trungtran.vn/tim-kiem/{laptop_name}/page-{page}"
    results = []
    try:
        r = requests.get(URL)
        soup = BeautifulSoup(r.text, 'lxml')
        frame_inner = soup.find_all("div", class_ = "frame_inner")
        for i in frame_inner:
            frame_title = i.find('div', class_ = 'frame_title')
            frame_price = i.find('div', class_ = 'frame_price')
            name = frame_title.h3.text.strip()
            if frame_price:
                price = frame_price.find('span', class_ ='price').text.strip()
            results.append({"name":name, "price":price})

        return Reply.make(True, 'Success', results)
    except requests.RequestException as e:
        return Reply.make(False, 'Failed', e)
    except Exception as e:
        return Reply.make(False, 'Failed', e)
