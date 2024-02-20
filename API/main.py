from fastapi import FastAPI, Depends, HTTPException, status,  Response, Query
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.middleware.cors import CORSMiddleware
from Controller import laptopaz, trungtran, anphatpc
from Helper.Reply import Reply

security = HTTPBasic()

app = FastAPI()
# app.include_router(laptopaz.router, prefix='/laptopaz')
# app.include_router(trungtran.router, prefix='/trungtran')
# app.include_router(anphatpc.router, prefix='/anphatpc')

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/getdata")
async def getdata(search_query: str, page : int):
    try:
        data_from_laptopaz = laptopaz.crawl_data_from_laptopaz(search_query, page)
        data_from_anphatpc = anphatpc.crawl_data_from_anphatpc(search_query, page)
        data_from_trungtran = trungtran.crawl_data_from_trungtran(search_query, page)

        combined_data = {
            "anphatpc": data_from_anphatpc,
            "laptopaz": data_from_laptopaz,
            "trungtran": data_from_trungtran
        }
        return Reply.make(True, 'Success', combined_data)
    except Exception as e:
        return Reply.make(False, 'Failed', e)
    

