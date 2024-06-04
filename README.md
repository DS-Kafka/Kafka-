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


# 在一個Terminal中啟動 Kafka 和 Zookeeper：

```bash
sudo docker-compose up -d
```

# 在新的Terminal中啟動後端服務：

```bash
sudo docker-compose up --build ds_backend
```

# （Optional）若出問題可以先關閉剛剛開好的內容：

```bash
docker-compose down
```

# 在新的Terminal測試 /api/purchase API 是否可以成功接收到請求，並將資料正確傳送至 Kafka：

```bash
curl -X POST http://localhost:3000/api/purchase -H "Content-Type: application/json" -d "{\"buyerName\": \"Alice\", \"amount\": 1}"
```

# 進入 MySQL Container 並檢查資料庫：

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
