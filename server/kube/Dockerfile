FROM openjdk:14-alpine as builder

WORKDIR /api

COPY gradle gradle
COPY gradlew .
COPY build.gradle .
COPY src .

RUN sh gradlew war

FROM tomcat:9-jdk14-openjdk-slim-buster

COPY --from=builder /api/build/libs/scrumboard-graphql.war /usr/local/tomcat/webapps/graphql.war
