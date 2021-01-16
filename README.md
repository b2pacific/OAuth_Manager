# OAuth_Manager

## Overview


This project is a OAuth Manager. This Manager will manage and provide permissions to external clients to access APIs offered by a company’s services. It will help to speed up their integration with Clients and provide them with access to specific APIs.
Companies can host this project as a microservice and provide it the access to their database of users and clients and then the clients can access user info according to the scope which a user grants to them. I have implemented the whole architecture of the service similar to Github's OAuth.
Features like limiting the number of request of clients who are not registered with the company are also taken care of.

## Problem this project solves?

Most of the companies need OAuth to provide resources to their clients. Setting up a OAuth service can be tiring at times. You have to decide the schemas for users, clients and the relationship between them. Then there's also the architecture of authentication, authorization grant and autorization and other stuff. 

## Goal

This project makes it very easy to integrate OAuth service in their system. With this open source project it becomes a piece of cake. The companies have to some changes in their database schemas and provide the access to the same to this service which can be hosted on their servers, and the Manager is ready to serve the clients.