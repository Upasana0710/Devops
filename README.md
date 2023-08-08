# Notes App REST API with Docker Packaging - README

This project involves creating a RESTful API for a basic notes application that allows users to perform CRUD operations (Create, Read, Update, Delete) on notes. The API will be built using a chosen programming language and web framework, and the notes will be stored in a database. To facilitate easy deployment, the application will be packaged within a Docker container. This README will guide you through setting up and using the Notes App API.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Step 1: Clone the Repository](#step-1-clone-the-repository)
  - [Step 2: Build the Docker Image](#step-2-build-the-docker-image)
  - [Step 3: Run the Docker Container](#step-3-run-the-docker-container)
- [API Documentation](#api-documentation)
- [Docker Compose](#docker-compose)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create new notes.
- Retrieve existing notes.
- Update existing notes.
- Delete notes.
- Easy deployment using Docker.

## Prerequisites

Before you begin, make sure you have the following tools installed:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Git: [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Getting Started

Follow these steps to set up and run the Notes App API using Docker.

### Step 1: Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the URL of this repository.

### Step 2: Build the Docker Image

Navigate to the cloned repository's directory and build the Docker image using the provided Dockerfile:

```bash
cd notes-app-api
docker build -t notes-app-api .
```

### Step 3: Run the Docker Container

Run the Docker container using the following command:

```bash
docker run -p 5000:5000 notes-app-api
```

The API will now be accessible at `http://localhost:5000`.

## API Documentation

The API endpoints and their usage are documented in the [API Documentation](api-documentation.md) file. This documentation provides information on how to create, read, update, and delete notes using the API.

## Docker Compose

To run the API and the associated database together using Docker Compose, follow these steps:

1. Navigate to the root directory of the repository.
2. Create a file named `docker-compose.yml`.
3. Add the following content to the `docker-compose.yml` file:

```yaml
version: "3"
services:
  notes-app-api:
    build: ./notes-app-api
    ports:
      - "5000:5000"
  database:
    image: <database-image-name>
    # Add database configuration and environment variables here
```

Replace `<database-image-name>` with the name of the database Docker image you intend to use.

4. Save the file and run the following command:

```bash
docker-compose up
```

This will start both the Notes App API and the database containers together.

## License

This project is licensed under the [MIT License](LICENSE).

---

By following these instructions, you should be able to set up the Notes App API, package it using Docker, and deploy it in a convenient and isolated environment. If you encounter any issues or have questions, please refer to the [API Documentation](api-documentation.md) or seek assistance from the project maintainers. Happy coding!

## Following are images of the working of CRUD features on Postman:

1. Create Note
![image](https://github.com/Upasana0710/Devops/assets/100614635/d3c5fbfa-ef96-484c-a4df-5ed74236c338)

2. Get Notes
![image](https://github.com/Upasana0710/Devops/assets/100614635/bccf09d5-0945-4f43-aba9-6ae901f5dba5)

3. Update Note
![image](https://github.com/Upasana0710/Devops/assets/100614635/f51d4e9d-52be-4328-90ca-3361796b6676)

4. Delete Note
![image](https://github.com/Upasana0710/Devops/assets/100614635/77d513f6-7359-4e4f-9d6f-7c163ab6e212)
