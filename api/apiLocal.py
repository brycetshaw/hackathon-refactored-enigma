from fastapi import FastAPI
import uvicorn
import numpy as np
import pickle
import pandas as pd

app = FastAPI()
pickle_in = open("/Users/thomaszhao/Dev/FastAPI-main/classifier.pkl","rb")
model=pickle.load(pickle_in)

@app.get("/")
def health():
    return {"health": "OK"}


@app.get("/predict/{csv_file}")
def predict(csv_file):


    return {csv_file}

if __name__ == '__main__':
    uvicorn.run(app, port=8000)