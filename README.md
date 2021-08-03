# Share Memory

### Technologies

- Django
- Django REST
- ReactJS
- Redux
- Docker

### Structure
```

Project/
|-- backend # Django API server
|-- frontend # ReactJS Frontend
```


## Run with docker

```

cd Share-Memories
docker-compose up --build

```

## Setup & Run with virtualenv

### Setup Virtualenv

Make sure you are using python>=3 and pip3

```

cd Share-Memeories

# Install virtualenv
python3 -m pip install --user virtualenv

python3 -m venv env

# activate the virtualenv
source env/bin/activate

```

### Install Backend dependencies

```

# Install all python packages
pip3 install -r requirements.txt

# Verify packages are successfully installed
pip3 freeze

```
