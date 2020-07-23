
# Pull base image
FROM python:3.8

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory, we can name it whatever we want
WORKDIR /backend/code

# Install dependencies
# Copy requirement file to the docker workdir we defined named backend/code
COPY requirements.txt /backend/code/
RUN pip install -r requirements.txt

# Copy project
COPY . /backend/code/

