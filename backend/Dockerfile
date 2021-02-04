### Build and install packages
FROM python:3.8-slim

RUN apt-get -y update \
    # Cleanup apt cache
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set workdir, install Python dependencies
WORKDIR /code/backend
COPY requirements.txt /code/backend/
RUN pip install -r requirements.txt

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Copy project
COPY . /code/backend/
EXPOSE 8000
