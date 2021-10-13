# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Init postgres database with
```shell
docker run -d -p 5433:5432 --name typeorm -e POSTGRES_USER=typeorm -e POSTGRES_PASSWORD=typeorm -e POSTGRES_DB=typeorm --mount src=db-typeorm-volume,dst=/var/lib/postgresql/data postgres
```
4. Run `npm run typeorm migration:run`
5. Run `npm start` command

### To create migration
```shell
# -- for args forwarding onto actual script
npm run typeorm migration:generate -- -n migration name
```

### To revert a migration
```shell
npm run typeorm migration:revert
```

### To show all migration
```shell
npm run typeorm migration:show
```
