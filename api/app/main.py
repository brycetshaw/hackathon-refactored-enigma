from fastapi import FastAPI
import uvicorn
import pickle
import numpy as np
import datetime
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pickle_in = open("hackathon-refactored-enigma/model/flood-forecaster/notebooks/model.pkl","rb")
model=pickle.load(pickle_in)
df = pd.read_csv("app/dataframe2.csv",parse_dates=['Date_Time'])


@app.get("/")
def health():
    return {"health": "OK"}

@app.get("/predict/")
def predict(date: str):
    center_date=datetime.datetime.strptime(date, '%Y-%m-%d')
    five_day=datetime.timedelta(days=5)

    start_date = center_date - five_day
    end_date = center_date + five_day

    X_matrix = df

    #previous 5 days of data
    from_actual=(X_matrix['Date_Time']>= start_date) & (X_matrix['Date_Time']<center_date)
    actual_before = X_matrix.loc[from_actual]
    actual_before = actual_before.set_index('Date_Time')['calgary_bow_flow(m3/s)']
    actual_before = pd.DataFrame(actual_before)

    X_matrix=X_matrix.drop(columns=['calgary_bow_flow(m3/s)']) 
    #predicting next 5 days of data
    select=(X_matrix['Date_Time']>= center_date) & (X_matrix['Date_Time']<=end_date)
    selected_X=X_matrix.loc[select].set_index('Date_Time')
    y_result = model.predict(selected_X)
    predicted_result=pd.DataFrame(data=y_result,index=selected_X.index, columns=['calgary_bow_flow(m3/s)'])
    
    forecast = actual_before.append(predicted_result)

    return forecast

@app.get("/features/")
def get_features():
    return list(df)

@app.get("/query/")
def predict(feature: str, start_date: str,end_date: str):
    temp= (df['Date_Time']>=datetime.datetime.strptime(start_date, '%Y-%m-%d')) & (df['Date_Time']<=datetime.datetime.strptime(end_date, '%Y-%m-%d'))
    return df.loc[temp].set_index('Date_Time')[feature]

if __name__ == '__main__':
    uvicorn.run(app)