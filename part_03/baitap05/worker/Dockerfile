FROM eclipse-temurin:17

WORKDIR /app

RUN apt-get update && apt-get install -y wget

# tải thư viện
RUN wget https://repo1.maven.org/maven2/redis/clients/jedis/4.3.1/jedis-4.3.1.jar
RUN wget https://jdbc.postgresql.org/download/postgresql-42.6.0.jar
RUN wget https://repo1.maven.org/maven2/com/google/code/gson/gson/2.10.1/gson-2.10.1.jar

COPY Worker.java .

RUN javac -cp ".:jedis-4.3.1.jar:postgresql-42.6.0.jar:gson-2.10.1.jar" Worker.java

CMD ["java", "-cp", ".:jedis-4.3.1.jar:postgresql-42.6.0.jar:gson-2.10.1.jar", "Worker"]