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


# sendToKafka.js實作的功能：確保傳送資料至 Kafka 時，topic 已經是準備就緒的狀態。
**1. ensureTopicExists: 這個Function可以用來確保 Kafka 的 topic 存在，如果不存在的話，就創建 topic。**
  1-1：這邊使用 AdminClient 來管理 topic。
  1-2：當 producer 準備就緒後，就可以使用 ensureTopicExists 來檢查或創建 topic。
**2. sendToKafka: 這是用來把資料傳送到 Kafka 的Function。**
  2-1：這邊則是使用 producer.produce 來把資料傳送至指定的 topic。
  2-2：資料在傳送前，會先被轉換為 Buffer 格式。

# purchase.js實作的功能：處理購買請求，並將資料傳送至 Kafka：
**1. 資料驗證**
  1-1：這邊會先檢查Request的 buyerName 和 amount 是否有效。
  1-2：如果無效的話，就回應 400 Bad Request。
**2. 資料處理**
  2-1：如果Request是有效的，那我們就會創建一個包含購買資訊的資料物件。
  2-2：這邊會使用 JSON.stringify 將資料物件轉換為 JSON 字符串。
**3. 傳送至 Kafka**
  3-1：我們可以透過上面的 sendToKafka 這個Function，去把資料傳送到 Kafka。
  3-2：如果資料成功傳送的話，就回應 200 OK。


# 測試步驟：在一個Terminal中啟動 Kafka 和 Zookeeper：

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
