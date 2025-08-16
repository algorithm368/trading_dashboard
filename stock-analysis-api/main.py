from fastapi import FastAPI, Query
from typing import List

app = FastAPI()

@app.get("/analyze")
