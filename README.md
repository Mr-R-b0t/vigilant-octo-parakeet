# Project Overview

This project is a modern web application built with Vue.js for the frontend and Node.js for the backend. It leverages GitLab CI/CD to automate the building, testing, deployment, and user acceptance testing (UAT) processes, ensuring a streamlined and reliable development workflow. This a prototype done during a DevOps class, please don't use for production purposes.

In order to run this code you will need to have a domain name, and multiple servers running inside a docker swarm.

## Features

### Frontend (Vue.js)

- Built with Bun for efficient development and build processes.
- Dockerized for consistent deployment across environments.

### Backend (Node.js)

- Uses Bun for package management and testing (with Mocha).
- Dockerized for deployment alongside the frontend.

### GitLab CI/CD Pipeline

#### Stages:

- `build`: Compiles frontend and backend code.
- `test`: Runs backend unit tests.
- `deploy`: Builds and deploys Docker images to various environments (dev, int, preprod, prod).
- `uat`: Performs automated UAT using Selenium and Robot Framework.

#### Environments:

- `dev`: Development environment for continuous integration.
- `int`: Integration environment for testing releases.
- `preprod`: Pre-production environment for final checks before production.
- `prod`: Production environment, triggered manually for controlled releases.

## Infrastructure

- `Traefik`: Reverse proxy for routing traffic and handling SSL certificates.
- `Docker Swarm`: Orchestrates the deployment of services across multiple nodes.

## Monitoring and Observability

- `Dozzle`: Provides real-time logs for Docker containers.
- `Netdata`: Monitors system and application performance.
- `Prometheus`: Collects metrics from various sources.
- `Alertmanager`: Sends alerts based on Prometheus metrics.
- `Grafana`: Creates visualizations and dashboards for monitoring data.
- `Uptime Kuma`: Monitors service uptime and availability.

## Authentication

- `Authentik`: Open-source identity provider for authentication and authorization.

## Prerequisites

- GitLab Instance: You'll need a GitLab instance to host your project's repository and CI/CD pipeline.
- Docker: Install Docker and Docker Compose to run the application and services locally.
- Server Environments: Set up the necessary server environments (dev, int, preprod, prod) to match your deployment needs.
- OVH Account: Required for DNS management if you use Let's Encrypt certificates through the Traefik reverse proxy.

## Getting Started

### Clone the Repository:

```bash
git clone <repository_url>
```

### Configure the Environment:

- Create a `.env` file based on the provided `.env.example`.
- Adjust environment-specific variables in the CI/CD configuration files.

### Run Locally (optional):

```bash
docker-compose up -d
```

### Push to GitLab: Pushing your code will trigger the CI/CD pipeline.

## CI/CD Pipeline

The CI/CD pipeline defined in `.gitlab-ci.yml` takes care of the following:

- **Builds**: Frontend and backend are compiled separately.
- **Tests**: Backend unit tests are run using Mocha.
- **Deployment**: Docker images are created and pushed to a registry, and then deployed to the corresponding environment using `docker stack deploy`.
- **UAT**: Automated UAT tests are executed in a separate environment using Selenium and Robot Framework.
