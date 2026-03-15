# Park Pro - gRPC Microservices Platform

A scalable parking management system built with [NestJS](https://nestjs.com/) as a monorepo with multiple microservices communicating via gRPC.

## Overview

Park Pro is a distributed microservices architecture for managing parking operations, bookings, user authentication, notifications, and more. The system uses:

- **NestJS** - Progressive Node.js framework for building efficient, scalable server-side applications
- **gRPC** - High-performance RPC framework for inter-service communication
- **TypeScript** - Type-safe language
- **PostgreSQL** - Primary database
- **Redis** - Caching layer
- **Monorepo Structure** - Managed with NestJS CLI

## Project Structure

### Microservices (`apps/`)

| Service | Purpose |
|---------|---------|
| **auth** | Authentication and authorization service |
| **booking** | Booking management service |
| **gateway** | API Gateway for client requests |
| **notification** | Notification service |
| **parking** | Parking management and availability service |
| **user** | User profile and management service |

### Shared Libraries (`libs/`)

| Library | Purpose |
|---------|---------|
| **auth** | Authentication utilities and guards |
| **cache** | Caching utilities and strategies |
| **common** | Common utilities, DTOs, and interfaces |
| **database** | Database configuration and entities |
| **events** | Event bus and event definitions |
| **grpc-protos** | gRPC protocol buffer definitions |

## Prerequisites

- Node.js >= 18.x
- pnpm >= 8.x
- Docker & Docker Compose (for local development)
- PostgreSQL 15+
- Redis 7+

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd park-pro-grpc
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Setup environment variables

Copy the example environment file and configure it:
```bash
cp env.example env
```

Edit `env` with your configuration for:
- Database credentials
- Redis connection details
- gRPC service ports
- API keys and secrets

### 4. Setup local infrastructure (Docker)

Start PostgreSQL and Redis:
```bash
docker-compose -f docker/postgres/docker-compose.yml up -d
docker-compose -f docker/redis/docker-compose.yml up -d
```

## Running the Application

### Development Mode (All Services)
```bash
pnpm run start:dev
```

### Run specific microservice
```bash
# Auth service
pnpm run start auth

# Booking service
pnpm run start booking

# Gateway service
pnpm run start gateway

# Notification service
pnpm run start notification

# Parking service
pnpm run start parking

# User service
pnpm run start user
```

### Watch mode for specific service
```bash
pnpm run start:dev auth
pnpm run start:dev booking
# ... etc
```

### Production Mode
```bash
pnpm run build
pnpm run start:prod
```

## Testing

### Unit Tests
```bash
# All tests
pnpm run test

# Specific service
pnpm run test auth
pnpm run test booking
```

### Unit Tests in Watch Mode
```bash
# All tests
pnpm run test:dev

# Specific service
pnpm run test:dev auth
```

### E2E Tests
```bash
# All E2E tests
pnpm run test:e2e

# Specific service
cd apps/auth
pnpm run test:e2e
```

### Test Coverage
```bash
# All services
pnpm run test:cov

# Specific service
pnpm run test:cov auth
```

## Building

### Build all services
```bash
pnpm run build
```

### Build specific service
```bash
pnpm run build auth
pnpm run build booking
```

## gRPC Protocol Buffers

Protocol buffer definitions are located in `libs/grpc-protos/protos/`. Generated TypeScript code is in `libs/grpc-protos/generated/`.

### Regenerate gRPC TypeScript from .proto files
```bash
# Commands will depend on your build setup
# See libs/grpc-protos for proto compilation details
```

## Architecture

### Service Communication
- **Internal**: Services communicate via gRPC for high performance and type safety
- **External**: Clients interact with the system through the **Gateway** service REST API

### Data Flow
```
Client → API Gateway → Microservices (auth, booking, parking, etc.) → Database
                    ↓
                  Redis (caching)
```

### Database
- **PostgreSQL**: Primary relational database for all services
- **Shared connection pool** managed at library level

### Caching
- **Redis**: Distributed cache for frequently accessed data
- Configured in the cache library

## Development Workflow

### Adding a New Microservice
1. Create a new app: `pnpm nx g @nrwl/nest:app <service-name>`
2. Create the service structure with controller, module, and service
3. Add proto definitions if needed in `libs/grpc-protos`
4. Configure environment in `.env`

### Sharing Code
- Use the `libs/` directory to create shared libraries
- Export shared utilities, DTOs, and interfaces
- Maintain a single source of truth for common logic

### Environment Configuration
Edit `.env` for local development and configuration management

## Troubleshooting

### Services won't start
- Ensure PostgreSQL and Redis are running: `docker ps`
- Check environment configuration in `.env`
- Verify port availability for each service

### Database connection errors
- Verify PostgreSQL is running on the configured port
- Check database credentials in `.env`
- Ensure database exists and is accessible

### gRPC connection issues
- Verify each service is running on its configured gRPC port
- Check firewall settings for inter-service communication
- Review service logs for detailed error messages

## Useful Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Monorepo Guide](https://docs.nestjs.com/cli/monorepo)
- [gRPC Documentation](https://grpc.io/docs/)
- [Protocol Buffers Guide](https://developers.google.com/protocol-buffers)

## Contributing

Please follow these guidelines:
1. Create feature branches from `main`
2. Write tests for new functionality
3. Follow the existing code style
4. Submit pull requests with clear descriptions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Check existing issues in the repository
- Review the troubleshooting section above
- Consult NestJS and gRPC documentation
