from fastapi import FastAPI, HTTPException, APIRouter

router = APIRouter()

# Dữ liệu mô phỏng về người dùng
fake_users_db = {
    "user1": {
        "username": "user1",
        "password": "password1",
        "email": "user1@example.com",
    }
}

@router.post("/login/")
async def login(username: str, password: str):
    if username in fake_users_db:
        user = fake_users_db[username]
        if password == user["password"]:
            return {"message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid username or password")