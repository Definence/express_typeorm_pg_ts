# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command
4. Init postgres database with
```shell
docker run -d -p 5433:5432 --name typeorm -e POSTGRES_USER=typeorm -e POSTGRES_PASSWORD=typeorm -e POSTGRES_DB=typeorm --mount src=db-typeorm-volume,dst=/var/lib/postgresql/data postgres
```
