
FROM python:3.11-slim-bookworm


WORKDIR /app


RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*


COPY backend/requirements.txt .


RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt


COPY backend/ .


COPY frontend/dist/ backend/app/static/


RUN useradd -m -u 1000 user && \
    chown -R user:user /app

USER user


EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]