# OAuth_Manager

## Overview
S
This project is a OAuth Manager. This Manager will manage and provide permissions to external clients to access APIs offered by a company’s services. It will help to speed up their integration with Clients and provide them with access to specific APIs.
Companies can host this project as a microservice and provide it the access to their database of users and clients and then the clients can access user info according to the scope which a user grants to them. I have implemented the whole architecture of the service similar to Github's OAuth.
Features like limiting the number of request of clients who are not registered with the company are also taken care of.

## Problem this Project Solves

Most of the companies need OAuth to provide resources to their clients. Setting up a OAuth service can be tiring at times. You have to decide the schemas for users, clients and the relationship between them. Then there's also the architecture of authentication, authorization grant and autorization and other stuff. 

## Goal

This project makes it very easy to integrate OAuth service in their system. With this open source project it becomes a piece of cake. The companies have to some changes in their database schemas and provide the access to the same to this service which can be hosted on their servers, and the Manager is ready to serve the clients.

## Tech/Framework used

### Built with

* Nodejs
* Typescript

### Database

* PostgreSQL

## Installation

### Cloning the Project and Installing Dependencies

```
    > git clone https://github.com/b2pacific/OAuth_Manager.git
    > cd OAuth_Manager
    > yarn add or npm install .
```

### Adding Envinronment Variables

* Rename the file .env.example as .env

* If you have redisDB running on your Local Machine or on a docker then note down it's Port Number else get the config file for the redisDB if it's hosted on the cloud.

JWT_SECRET = This will contain the secret used for encrypting the JWT token
SERVER_AUTH = Token with which the Company's API Server will authenticate that this is the OAuth server making the request for the resources. You will have to add this to the API Server
DB_URI = This will contain the PostgreSQL database URL
PORT = The Port on which this service will run
BASE_URL = The Base URL for the API Server
REDIS_PORT = The Port on which Redis is running
UNREGISTERED_CLIENTS_REQUEST_LIMIT = 
REGISTERED_CLIENTS_REQUEST_LIMIT = 
