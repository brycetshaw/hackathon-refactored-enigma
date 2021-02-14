FROM python:3.7

RUN pip install fastapi uvicorn pandas numpy pickle

EXPOSE 4000

COPY ./app /app

CMD ["python", "app/main.py"]