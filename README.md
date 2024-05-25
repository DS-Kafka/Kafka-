# How to run

Run the following command to start the frontend and backend containers(but now just the backend):
```bash
sudo docker-compose up -d --build
```

DB now just has a `orders`table, so you can run the following command to modify it:
```bash
sudo docker exec -it ds_mysql /bin/sh
mysql -u root -p
```

For a full Kafka setup demoed previously, please refer to [this](https://github.com/timsu92/kafka_example.git).

Env file is in the line group. Copy and paste the env file to the root dir layer~~