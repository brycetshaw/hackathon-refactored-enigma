from fastapi import FastAPI
import uvicorn
import pickle
import numpy as np
import datetime
import pandas as pd

app = FastAPI()
df = pd.read_csv("hackathon-refactored-enigma/data/parsed/dataframe2.csv",parse_dates=['Date_Time'])
model=pickle.load(pickle_in)

@app.get("/")
def health():
    return {"health": "OK"}


@app.get("/predict/")
def predict(date: datetime.date):

    return 


@app.get("/query/")
def predict(feature: str, start_date: str,end_date: str):
    temp= (df['Date_Time']>datetime.datetime.strptime(start_date, '%Y-%m-%d')) & (df['Date_Time']<datetime.datetime.strptime(end_date, '%Y-%m-%d'))
    result=df.loc[temp].set_index('Date_Time')[feature]
    resultcsv=result
    return result

if __name__ == '__main__':
    uvicorn.run(app, port=8000)