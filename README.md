# Backend Project

## Description

This is a backend project built with Node.js, Express, and PostgreSQL. It provides functionality for RSS parser.

## Table of Contents

- [Installation](#installation)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [License](#license)

## Installation

1. Clone the repository
2. Navigate to the project directory: `cd backend`
3. Install the dependencies: `npm install`

## Database Setup

1. Ensure you have PostgreSQL installed and running.
2. Create a new PostgreSQL database for the application.
3. Locate the `database.sql` file in your project.
4. Run the SQL scripts to set up the database tables and schema:
   - Open a terminal or command prompt.
   - Navigate to the project directory.
   - Run the following command to execute the SQL scripts:

     ```bash
     psql -U <username> -d <database_name> -f database.sql
     ```

     Replace `<username>` with your PostgreSQL username and `<database_name>` with the name of the database you created.

5. Update the database connection details in `src/db/db.js` file to match your PostgreSQL configuration.

## Usage
1. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the required environment variables in the `.env` file. (e.g., `PORT`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`,  `CLIENT_URL`)
2. Start the development server: `npm run dev`

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
