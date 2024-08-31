# E-Commerce System API

## Project Overview

The application is a simple e-commerce system with the following functionalities:

- ### User Management

  - User registration and authentication.
  - Admin privileges for user management (approve/disapprove products, ban/unban users).
  - Role-based access control for users and admins.

- ### Product Management
  - Authenticated users can manage their own products (create, update, delete).
  - Only approved products are visible to unauthenticated users.

## Development Environment Setup

1. Clone the repository

   ```bash
    git clone https://github.com/TijanAyo/basic_ecommerce_system.git
    cd ecommerce-system
   ```

2. Install project dependencies

   ```bash
   npm install
   or
   yarn install
   ```

3. Set up environmental variables: Create a .env file in the root directory of the project and set up your environment variables.

   ```bash
    # In the root of your application
    touch .env

    # The above command will create a .env file
    # Make use of the .env.example as reference
   ```

   ```bash
    DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce_db
    JWT_SECRET=your_jwt_secret
    PORT=3000
   ```

   Note: To get a `DATABASE_URL`, you can check out platforms like [Neon](neon.tech), [Render](render.com), or [Aiven](aiven.io) to get access to a free relational database.

4. Run migration: Ensure the database schema is up-to-date by running migrations
   ```bash
    npx prisma migrate deploy
   ```

## Running the Application Locally

1. Start the development server: To start the application in development mode, run
   ```bash
   npm run start:dev
   ```
   or
   ```bash
   yarn start:dev
   ```

## API Documentation

To explore and interact with the API, please refer to the Swagger documentation available at

```bash
   http://localhost:3000/api-doc
```
