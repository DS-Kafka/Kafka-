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

For a full Kafka setup demoed previously, please refer to [this](https://github.com/timsu92/kafka_example.git).

Env file is in the line group. Copy and paste the env file to the root dir layer~~


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

For a full Kafka setup demoed previously, please refer to [this](https://github.com/timsu92/kafka_example.git).

Env file is in the line group. Copy and paste the env file to the root dir layer~~


# 測試步驟：在一個Terminal中啟動 Docker：
```bash
sudo docker-compose up -d
```

# （Optional）若在前一步驟時遇到沒有最新的錯誤，就要另外拉一下，沒有權限的話也要加一下：
```bash
docker pull mysql:8.0
```
```bash
docker pull node:20.4-alpine
```
```bash
docker pull wurstmeister/zookeeper:latest
```
```bash
docker pull wurstmeister/kafka:latest
```
```bash
sudo chmod -R 755 ~/.docker
```


# 在新的Terminal中啟動後端服務：
```bash
sudo docker-compose up --build ds_backend
```
<img width="783" alt="截圖 2024-06-11 凌晨12 51 24" src="https://github.com/DS-Kafka/Kafka-/assets/90824069/c5322e76-cc6b-4cf2-91df-73af4f0bd506">

註解：如果開啟時有 "Topic 'buy_topic' already exists" 的錯誤，應該不會影響系統的正常運行。


# （Optional）若出問題可以先關閉剛剛開好的內容：
```bash
docker-compose down
```

# 在新的Terminal測試 /api/purchase API 是否可以成功接收到請求，並將資料正確傳送至 Kafka：
```bash
curl -X POST http://localhost/api/purchase -H "Content-Type: application/json" -d '{"name": "Alice"}'
```
```bash
curl -X POST http://localhost/api/purchase -H "Content-Type: application/json" -d '{"name": "Bob"}'
```

<img width="796" alt="截圖 2024-06-11 凌晨12 52 10" src="https://github.com/DS-Kafka/Kafka-/assets/90824069/503d751a-7dff-4cb5-9e7e-e66e09068e75">

# 可以使用以下命令進入 Kafka 容器：
```bash
docker exec -it kafka--kafka-1 /bin/bash
```

# 進入 Kafka 容器後，可以使用以下命令確認 Kafka 中的Topic是否存在：
```bash
kafka-topics.sh --bootstrap-server localhost:9092 --list
```

# 也可以檢查後端的Server Log，看請求有沒有順利發給Kafka：
```bash
docker logs ds_backend_container
```

# 另外，也可以進入 MySQL Container 並檢查資料庫：
```bash
docker-compose exec mysql mysql -u ds -pds2024 ds
```

# 成功進入 MySQL 容器後，可以確認是否存在資料庫：
```bash
SHOW DATABASES;
```

# 可以對 MySQL 執行下面的測試，看看指令能不能成功完成：
```bash
SHOW TABLES;
```
```bash
DESCRIBE orders;
```
```bash
INSERT INTO orders (name) VALUES ('Test');
```
```bash
SELECT * FROM orders;
```
<img width="803" alt="截圖 2024-06-11 凌晨12 53 11" src="https://github.com/DS-Kafka/Kafka-/assets/90824069/327e6dcd-5d8e-4b64-95bf-85f001121635">

# WebSocket 測試
Install wscat
```bash
npm install -g wscat
```
Test WebSocket Server 1 - Counter 1
```bash
wscat -c ws://localhost:8083  
```
Test WebSocket Server 2 - Counter 2
```bash
wscat -c ws://localhost:8085
```

