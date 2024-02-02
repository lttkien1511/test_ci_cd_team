from fastapi import APIRouter, Query, HTTPException
from bs4 import BeautifulSoup
from Helper.Reply import Reply
import requests

router = APIRouter()

def crawl_data_from_laptopaz(laptop_name:str, page: int):
    URL = f"https://laptopaz.vn/tim?q={laptop_name}&page={page}"
    laptopname = []
    laptopprice = []
    laptopdata = []

    try:
        r = requests.get(URL)
        soup = BeautifulSoup(r.text, 'lxml')
        p_emtry = soup.find_all("div", class_ = "p-emtry")

        for a in p_emtry:
            p_name = a.find('a', class_ = 'p-name')
            p_price = a.find('span', class_ = 'p-price')

            name = p_name.text.strip()

            for tag in p_price.find_all():
                tag.decompose()
            price = p_price.text.strip()

            laptopdata.append({"name":name, "price":price})
        return Reply.make(True, 'Success', laptopdata)
            
    
    except requests.RequestException as e:
        return Reply.make(False, 'Failed', e)
    except Exception as e:
        return Reply.make(False, 'Failed', e)

