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

Kafka broker setup can refer to [this](https://github.com/Lu-weiting/Kafka-Lab/blob/main/docker-compose.yml).