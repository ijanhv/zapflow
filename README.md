# Zapier Clone in Node.js and Express

## Overview

This project is a Zapier clone built using Node.js and Express with a microservices architecture. It enables users to create, manage, and execute automated workflows (zaps) that involve various actions and triggers. The architecture is designed for scalability, reliability, and maintainability, leveraging Kafka for event-driven communication between services.

## Table of Contents

- [Architecture](#architecture)
  - [Microservices Overview](#microservices-overview)
  - [Service Communication](#service-communication)
- [Services](#services)
  - [Primary Backend](#primary-backend)
  - [Hooks Service](#hooks-service)
  - [Processor Service](#processor-service)
  - [Worker Service](#worker-service)
- [Database Schema](#database-schema)
  - [Users Table](#users-table)
  - [Zap Table](#zap-table)
  - [ZapRun Table](#zaprun-table)
  - [ZapOutbox Table](#zapoutbox-table)
- [Kafka Integration](#kafka-integration)
- [Running the Project](#running-the-project)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [API Endpoints](#api-endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Zap Management Endpoints](#zap-management-endpoints)
  - [Trigger Execution Endpoints](#trigger-execution-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Architecture

<details>
<summary><strong>Microservices Overview</strong></summary>

The application follows a microservices architecture, where each service is responsible for a specific functionality:

- **Primary Backend**: Handles user authentication, and CRUD operations for actions, triggers, and zaps.
- **Hooks Service**: Executes zaps based on triggers and logs the execution.
- **Processor Service**: Monitors `ZapRun` and `ZapOutbox` tables and sends messages to Kafka for further processing.
- **Worker Service**: Consumes messages from Kafka and executes the respective actions.

</details>

<details>
<summary><strong>Service Communication</strong></summary>

The services interact using REST APIs and Kafka topics, ensuring loose coupling and scalability. Kafka acts as the communication backbone, facilitating event-driven processing.

- **REST APIs**: Used for synchronous communication between services (e.g., user management, zap creation).
- **Kafka**: Used for asynchronous, event-driven communication (e.g., zap execution, results processing).

</details>

## Services

<details>
<summary><strong>Primary Backend</strong></summary>

- **Authentication**: Manages user sign-up, login, and session management.
- **Zap Management**: Allows users to create, update, and delete zaps. Each zap is associated with specific triggers and actions and is stored in the `Zap` table.

</details>

<details>
<summary><strong>Hooks Service</strong></summary>

- **Trigger Execution**: This service initiates the execution of a zap when a trigger condition is met.
- **Zap Execution**: Runs the zap and logs the execution in the `ZapRun` and `ZapOutbox` tables for further processing.

</details>

<details>
<summary><strong>Processor Service</strong></summary>

- **Monitoring**: Continuously checks the `ZapOutbox` table for new entries indicating zaps ready for execution.
- **Kafka Integration**: Pushes zap execution data to Kafka, making it available for the Worker service to consume.

</details>

<details>
<summary><strong>Worker Service</strong></summary>

- **Kafka Consumer**: Listens to the `zap-execution` topic on Kafka for zap execution instructions.
- **Action Execution**: Executes the actions associated with a zap and records the results.

</details>

## Database Schema

<details>
<summary><strong>Users Table</strong></summary>

- **Fields**:
  - `id`: Primary key, auto-increment.
  - `username`: Unique username for the user.
  - `password`: Hashed password.
  - `email`: Email address of the user.
  - `created_at`: Timestamp when the user was created.

</details>

<details>
<summary><strong>Zap Table</strong></summary>

- **Fields**:
  - `id`: Primary key, auto-increment.
  - `user_id`: Foreign key referencing the `Users` table.
  - `name`: Name of the zap.
  - `trigger`: JSON object defining the trigger condition.
  - `actions`: JSON array defining the actions to be executed.
  - `created_at`: Timestamp when the zap was created.

</details>

<details>
<summary><strong>ZapRun Table</strong></summary>

- **Fields**:
  - `id`: Primary key, auto-increment.
  - `zap_id`: Foreign key referencing the `Zap` table.
  - `status`: Status of the zap run (e.g., pending, completed, failed).
  - `result`: JSON object storing the result of the zap execution.
  - `created_at`: Timestamp when the zap run was created.

</details>

<details>
<summary><strong>ZapOutbox Table</strong></summary>

- **Fields**:
  - `id`: Primary key, auto-increment.
  - `zap_run_id`: Foreign key referencing the `ZapRun` table.
  - `message`: JSON object containing the message to be processed by the Worker service.
  - `created_at`: Timestamp when the outbox entry was created.

</details>

## Kafka Integration

Kafka is used to handle asynchronous communication between services, ensuring that zaps are executed reliably and efficiently.

<details>
<summary><strong>Kafka Topics</strong></summary>

- **zap-execution**: Used by the Processor service to push zap execution instructions for the Worker service to consume.
- **zap-result**: Used by the Worker service to push the results of executed zaps.

</details>

## Tech Stack

| Technology      | Purpose                                             |
|-----------------|-----------------------------------------------------|
| **Node.js**     | JavaScript runtime for server-side logic            |
| **Express.js**  | Web framework for building APIs                     |
| **Nextjs**      | Frontend                                            |
| **Kafka**       | Event streaming platform for inter-service communication |
| **MySQL**       | Relational database for storing zaps, users, and execution logs |
| **Docker**      | Containerization for consistent environments        |
| **Docker Compose** | Orchestrates multi-container Docker applications  |

## Architecture Diagram

![Architecture Diagram](path/to/your/architecture-diagram.png)


## Running the Project

<details>
<summary><strong>Prerequisites</strong></summary>

- Docker and Docker Compose
- Node.js and npm

</details>

<details>
<summary><strong>Steps</strong></summary>

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ijanhv/zapier.git
   cd zapier


