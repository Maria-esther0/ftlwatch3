#!/bin/bash

flyway -url=jdbc:postgresql://$DATABASE_HOST:$DATABASE_PORT/$POSTGRES_DB \
    -user=$POSTGRES_USER -password=$POSTGRES_PASSWORD -baselineOnMigrate=true \
    -configFiles="/flyway/conf/flyway.conf" \
    -locations="filesystem:sql" migrate