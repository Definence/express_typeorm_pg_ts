# express_typeorm_pg_ts

### Run PG container
```
docker run -d -p 5433:5432 --name blog -e POSTGRES_USER=blog -e POSTGRES_PASSWORD=blog --mount src=db-blog,dst=/var/lib/postgresql/data postgres
```
### Run dev server
```
npm run dev
```
