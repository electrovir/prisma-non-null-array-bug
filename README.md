# prisma-non-null-array-bug

## Setup

1. spin up a postgres server with Docker:
    ```sh
    docker run --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16
    ```
2. `npm ci`
3. `npx prisma migrate dev --name init`
3. `npm start`

## Results

1. Rows can be created with a `null` array field (the SQL migration does not mark the field as non null), even though the schema defined the field as not-null.
2. Rows with a `null` array field values cannot be quired directly with a `null` value.

## Workaround

Add `@default([])` to the array field.