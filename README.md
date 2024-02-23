# Code-sharing Platform

## Description

Code-sharing Platform is a web-based application designed to streamline the process of sharing and collaborating on code. It integrates with various APIs and services to provide a seamless user experience.

## Architecture

The application is structured around a Next.js framework, distinguishing between client and server components for optimized rendering and performance. Data is managed using a Convex DB, ensuring efficient and reliable data flow. The authentication flow is handled by Descope, providing secure and streamlined user access. The architecture also includes interfaces with GitHub API and Descope API for extended functionality.

![architecture diagram.png](doc%2Farchitecture%20diagram.png)

## Features

- Seamless code sharing and collaboration
- Integration with GitHub for repository management
- Secure authentication flow via Descope
- Real-time updates and management with Convex DB

## Technology Stack

- Next.js
- Convex DB
- Descope API
- GitHub API

## Installation Instructions

To set up the Code-sharing Platform locally, follow these steps:

1. Clone the repository to your local machine.
2. Copy the `.env.default` file to a new file named `.env.local`.
3. Fill in the `.env.local` file with your personal credentials.
4. Run `npm install` to install all the dependencies.
5. Start the Convex development server using `npx convex run`.
6. Finally, start the Next.js development server with `npm run dev`.

Your local version of the Code-sharing Platform should now be running and accessible.

## Usage

After installation, the application can be accessed locally through your web browser. Utilize the various features as detailed in the platform's user interface.

## Configuration

Ensure that all the necessary environment variables and credentials are correctly set up in your `.env.local` file before running the application.

## License

This project is released under the [MIT License](LICENSE).
