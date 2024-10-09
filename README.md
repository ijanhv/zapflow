<div align="center">
<!--   <img src="https://github.com/ijanhv/dockify-api/raw/main/public/logo.png" alt="Dockify Logo" width="200"/> -->
  <h1>Zapflow</h1>
  <p><strong>Automate multiple workflows with Zapflow!</strong></p>
</div>

## Overview

This project is a Zapier clone built using Node.js and Express with a microservices architecture. It enables users to create, manage, and execute automated workflows (zaps) that involve various actions and triggers. The architecture is designed for scalability, reliability, and maintain ability, leveraging Kafka for event-driven communication between services.

## Architecture

### Microservices Overview

The application follows a microservices architecture, where each service is responsible for a specific functionality:

- **Primary Backend**: Handles user authentication, and CRUD operations for actions, triggers, and zaps.
- **Hooks Service**: Executes zaps based on triggers and logs the execution.
- **Processor Service**: Monitors `ZapRun` and `ZapOutbox` tables and sends messages to Kafka for further processing.
- **Worker Service**: Consumes messages from Kafka and executes the respective actions.

### Service Communication

The services interact using REST APIs and Kafka topics, ensuring loose coupling and scalability. Kafka acts as the communication backbone, facilitating event-driven processing.

- **REST APIs**: Used for synchronous communication between services (e.g., user management, zap creation).
- **Kafka**: Used for asynchronous, event-driven communication (e.g., zap execution, results processing).

### Transactional Outbox Pattern
This project implements the transactional outbox pattern to ensure reliable message delivery between services. The outbox pattern helps maintain data consistency across microservices by:

- Storing outgoing messages in a local "outbox" table within the same transaction as the business logic.
Using a separate process (the Processor Service) to read from the outbox table and publish messages to Kafka.
Ensuring that messages are only marked as processed after successful publication to Kafka.

- This approach guarantees that messages are not lost due to network issues or service failures, providing at-least-once delivery semantics.

## Services

### Primary Backend

- **Authentication**: Manages user sign-up, login, and session management.
- **Zap Management**: Allows users to create, update, and delete zaps. Each zap is associated with specific triggers and actions and is stored in the `Zap` table.

### Hooks Service

- **Trigger Execution**: This service initiates the execution of a zap when a trigger condition is met.
- **Zap Execution**: Runs the zap and logs the execution in the `ZapRun` and `ZapOutbox` tables for further processing.

### Processor Service

- **Monitoring**: Continuously checks the `ZapOutbox` table for new entries indicating zaps ready for execution.
- **Kafka Integration**: Pushes zap execution data to Kafka, making it available for the Worker service to consume.

### Worker Service

- **Kafka Consumer**: Listens to the `zap-execution` topic on Kafka for zap execution instructions.
- **Action Execution**: Executes the actions associated with a zap and records the results.


## Kafka Integration

Kafka is used to handle asynchronous communication between services, ensuring that the processor service is not overloaded and zaps are executed reliably and efficiently.

- **zap-execution**: Used by the Processor service to push zap execution instructions for the Worker service to consume.
- **zap-result**: Used by the Worker service to push the results of executed zaps.

## Tech Stack

| Technology      | Purpose                                             |
|-----------------|-----------------------------------------------------|
| **Node.js**     | JavaScript runtime for server-side logic            |
| **Express.js**  | Web framework for building APIs                     |
| **Nextjs**      | Frontend                                            |
| **Kafka**       | Event streaming platform for inter-service communication |
| **Prisma**           | ORM for database modeling and queries with PostgreSQL     |
| **PostgreSQL**       | Relational database for storing users, zaps, triggers, and actions |
| **Docker**      | Containerization for consistent environments        |
| **Docker Compose** | Orchestrates multi-container Docker applications  |

## Running the Project

### Prerequisites

- Docker and Docker Compose
- Node.js and npm
- Postgres 
- Prisma
- Next.js

### Steps

1. **Clone the Repository**:
  ```bash
  git clone https://github.com/ijanhv/zapier.git
  cd zapier
