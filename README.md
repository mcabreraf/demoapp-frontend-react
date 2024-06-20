# Frontend React Application

Welcome to the frontend React application that serves as the interface for a Flask backend application. Below is an overview of its architecture, functionality, and deployment details.

- Website: [https://www.manuelprojectsinaws.com/](https://www.manuelprojectsinaws.com/)

## Architecture Overview

### Deployment

The React application is hosted in an Amazon S3 bucket. A CloudFront distribution is configured with the S3 bucket as its origin. Each deployment triggers a new cache invalidation in CloudFront to ensure that updated elements and features in the S3 bucket are immediately accessible to users.

## Functionality

The React application provides different routes based on the business logic:

- **Register**: Users can register to create an account.
- **Login**: After registration, users can log in to access the application.
- **Contacts**: The main functionality resides in the `/contacts` route, where users can manage their contacts. Access to this route requires authentication.

## Links

- **Backend Flask Application**:
  - GitHub Repository: [https://github.com/mcabreraf/demoapp-backend-flask](https://github.com/mcabreraf/demoapp-backend-flask)

This React application serves as a foundational frontend service, leveraging React’s capabilities within an AWS architecture setup. It interfaces with the Flask backend to provide a seamless user experience for managing contacts.