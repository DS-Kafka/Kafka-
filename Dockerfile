FROM mysql:8.0

ARG MYSQL_ROOT_PASSWORD

ENV MYSQL_DATABASE=ds
ENV MYSQL_ROOT_PASSWORD $MYSQL_ROOT_PASSWORD
ENV MYSQL_USER ds
ENV MYSQL_PASSWORD $MYSQL_ROOT_PASSWORD

ADD ./backend/scripts/testDB/backup.sql /docker-entrypoint-initdb.d

EXPOSE 3306

LABEL org.opencontainers.image.source https://github.com/DS-Kafka/Kafka-