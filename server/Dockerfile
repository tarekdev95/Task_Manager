FROM python:3.11

# Configurer poetry
ENV PYTHONUNBUFFERED=1 
ENV POETRY_VERSION=2.1.3\
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_NO_INTERACTION=1 


# Installer les outils système + Poetry
RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential gcc libpq-dev \
  && pip install "poetry==$POETRY_VERSION" \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pyproject.toml poetry.lock* ./
RUN poetry install --no-root

COPY . .

EXPOSE 8000

CMD [ "poetry","run", "python", "manage.py", "runserver", "0.0.0.0:8000"]


