CREATE DATABASE keycloak;
CREATE USER keycloak.keycloak WITH PASSWORD 'keycloak';
GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
