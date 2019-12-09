# smart-checkout-backend

Smart Checkout is a mobile app that allows users to self-checkout from supermarkets without having to stand in long queues. This is the backend of the application, check the [Frontend Repo](https://github.com/Lujine/smart-checkout-frontend "Frontend application repo") of the application done with react native.

### Built With
- Node.JS
- Express
- MongoDB
- Docker

### Prerequisites
This project requires node and npm to be installed on your machine. It has been tested on node version 10.15.0. The project uses the Atlas cloud by MongoDB to host the database, you need to make an account to be able to use Atlas's services.

### Getting Started
1. git clone the repo or download as a zip file.
```bash
git clone https://github.com/Lujine/smart-checkout-backend.git
```
2. Install the dependancies.
```sh
npm i
```
3. add .env file. Check the example file for more information about the required configurations.
- Set Mongo URI (can be obtained from your Atlas account)
- Configure JWT Secret which is a key that encodes the user passwords saved in the database

## Running the app

### Using NPM
```sh
npm start
```

### Using the Docker file
- build the docker image
```docker
docker build -t smart-checkout .
```
- get image id
```docker
docker image ls
```
- run
```docker
docker run -p 8080:8080 -d <image id>
```
- get container id
```docker
docker ps
```
- check logs to make sure app is running
```docker
docker logs <container id>
```
- test connection
```docker
curl -i localhost:8080
```
- If the test returned status 200 OK, then you can start sending requests to localhost:8080

### Using Docker Compose
commands to run
```
docker-compose up
```

## Deployment
- The backend is deployed on [smart checkout backend](https://smartcheckoutbackend.herokuapp.com "Smart Checkout Backend"), you can send your requests to the url straight away

## License
[MIT](https://choosealicense.com/licenses/mit/)
