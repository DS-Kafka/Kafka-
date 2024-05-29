# How to run

Run the following command to start the frontend, backend containers and DB container(but now just the backend and db container):
```bash
sudo docker-compose up -d --build
```
# DB set
Every time you change the DB data ex: add a new table, add a new column, change a column type, add a new data(order..), etc. You need to run the following command to update the DB backup file. DB is built up based on the data in the backup file.
```bash
cd backend/scripts/testDB
sh backup-db.sh
```

Kafka broker setup can refer to [this](https://github.com/Lu-weiting/Kafka-Lab/blob/main/docker-compose.yml).

Env file is in the line group. Copy and paste the env file to the root dir layer~~