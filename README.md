This project is a web-based Time Clock application that allows employees to log their entry, break, and exit times throughout the day. It also provides features to view previous entries and export data in various formats.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- Employee login and registration
- Log entry, break, and exit times
- View previous entries in a tabular format
- Add notes to each entry
- Export entries as PDF, CSV, or XLS files

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Clone the Repository

\`\`\`bash
git clone https://github.com/maormoyal/Time-clock.git
\`\`\`

\`\`\`bash
cd time-clock
\`\`\`

### Install Dependencies

\`\`\`bash
npm install
\`\`\`

This command will install both the client and server dependencies.

## Usage

### Running the Development Server

To start the development server for both the client and server, run:

\`\`\`bash
npm run start:dev
\`\`\`

This will concurrently start the client and server in development mode.

### Building for Production

To build the client and server for production, run:

\`\`\`bash
npm run build
\`\`\`

### Running the Production Server

To start the production server, run:

\`\`\`bash
npm start
\`\`\`

## Scripts

### Main Scripts

- **\`npm start\`**: Starts both client and server in production mode.
- **\`npm run start:dev\`**: Starts both client and server in development mode with hot reloading.
- **\`npm run build\`**: Builds both client and server for production.

### Client-Specific Scripts

Navigate to the \`client\` directory to run these scripts.

- **\`npm run dev\`**: Starts the client in development mode.
- **\`npm run build\`**: Builds the client for production.
- **\`npm run lint\`**: Runs eslint on the client code.
- **\`npm run preview\`**: Serves the built client for preview.

### Server-Specific Scripts

Navigate to the \`server\` directory to run these scripts.

- **\`npm start\`**: Starts the server in production mode.
- **\`npm run start:dev\`**: Starts the server in development mode with hot reloading.

## Environment Variables

To set up environment variables, create \`.env.development\` and \`.env.production\` files in the root of your project.

### .env.development

\`\`\`plaintext
VITE_API_BASE_URL=http://localhost:5000/api
\`\`\`

### .env.production

\`\`\`plaintext
VITE_API_BASE_URL=https://not-working/api
\`\`\`

## Contributing

If you would like to contribute, please fork the repository and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

Distributed under the MIT License. See \`LICENSE\` for more information." > README.md
