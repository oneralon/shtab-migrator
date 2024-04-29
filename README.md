### Database continious migration

#### Development

```
npm ci
docker compose up
```

#### Build docker

```
docker build -t <tag>
docker run <tag>
```

#### Environment example

```
# DynamoDB
AWS_REGION=eu-central-1
AWS_ACCESS_KEY_ID=access-key-id
AWS_SECRET_ACCESS_KEY=secret-access-key
DYNAMODB_URL=http://dynamodb:8000
DYNAMODB_DONATIONS_TABLE=donor-contact

# PostgreSQL
POSTGRES_HOST=postgres.com
POSTGRES_PORT=5432
POSTGRES_DATABASE=shtab
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=changeme
```
