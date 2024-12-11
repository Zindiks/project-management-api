# Project



**Tech stack**
Fastify
knex.js
postgresql
docker



## Architecture

![alt text](trello-clone.excalidraw-1.png)


## TODO
* Build Auth service OAuth
    * Implement OAuth 2.0 for secure authentication
    * Integrate with popular OAuth providers (e.g., Google, Facebook)
    * Ensure token validation and refresh mechanisms
* Splitting the monolithic Fastify API into API Gateway and separate microservices
    * Identify core services to be extracted
    * Design and implement API Gateway for routing and aggregation
    * Develop and deploy individual microservices
    * Ensure inter-service communication and data consistency



### Sources
...

...

###### Reduce docker image size
https://blog.devgenius.io/reduce-the-size-of-your-node-js-docker-image-by-up-to-90-53aad23890e2
https://medium.com/@swappy20_61978/how-to-reduce-your-node-docker-image-size-by-90-for-production-2df3e19b2940
https://mohibulalam75.medium.com/exploring-lightweight-docker-base-images-alpine-slim-and-debian-releases-bookworm-bullseye-688f88067f4b
https://www.specfy.io/blog/1-efficient-dockerfile-nodejs-in-7-steps