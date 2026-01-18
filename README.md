# summary

this is a simple restfull api built with NestJs

## requirements
- node.js
- pnpm
- postgreSQL

## installation

```bash
cp .env.example .env
```

```bash
$ pnpm install
```

## running

```bash
$ pnpm start:dev
```

If there are migrations and seeders, run them first before running the application

## api
docs: http://localhost:3000/SWAGGER_DOCS_PATH

## database

### migration
#### run migration
```bash
$ pnpm migration:run
```

#### create migration
```bash
$ pnpm migration:create src/database/migrations/name_migration
```

#### generate migration
```bash
$ pnpm migration:generate src/database/migrations/name_migration
```

#### revert migration
```bash
$ pnpm migration:revert
```

### seed
#### run seed
```bash
$ pnpm seed:run
```

#### create seed
```bash
$ pnpm seed:create src/database/seeders/name_seed
```

#### revert seed
```bash
$ pnpm seed:revert
```

## references
- NestJs: https://nestjs.com/
- TypeORM: https://typeorm.io/
- PostgreSQL: https://www.postgresql.org/
- pnpm: https://pnpm.io/


