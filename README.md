# FrameData API

### A secure, containerized REST API for managing fighting game characters, moves, and frame data with JWT auth, validation, and automated self-hosted deployment.

FrameData API is a production-minded backend service for managing fighting game frame data, including characters, moves, and move specific timing details. It is built with Node.js, Express, and PostgreSQL, secured with JWT authentication, request validation, and rate limiting, and containerized with Docker Compose for reliable local and remote deployment. The project also includes automatic deployment through GitHub Actions with a self-hosted runner, giving it a clean CI/CD workflow while utilizing GitHub Secrets to keep sensitive data outside of the repository. Overall, it is designed to be a practical and scalable API foundation with strong testing and security already in place.

## Features
- JWT Authentication
- Joi request validation
- Rate limiting
- Centralized error handling
- PostgreSQL relational schema
- Docker Compose
- Jest + Supertest testing
- GitHub Actions self-hosted deployment

## API Endpoints
| POST | /api/auth/register | Register user
| POST | /api/auth/login | Login existing user and receive JWT
| GET | /api/characters | Get characters
| POST | /api/characters | Create characters
| GET | /api/moves | Get moves
| POST | /api/moves | Create moves
| GET | /api/frame-data/:characterName | Get character frame data
| POST | /api/frame-data | Create character frame data

## Security and Reliability
JWT authentication, rate limiting, Joi input validation, protected endpoints, centralized error handling, database health checks
