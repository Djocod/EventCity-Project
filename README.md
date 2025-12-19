# EventCity Project

EventCity is a web application that allows users to search for artists, events, and integrates services like Spotify and Ticketmaster.

## Prerequisites

- Node.js (recommended version: 18.x or higher)
- npm (usually comes with Node.js)

## Installation

1. **Clone the repository**

```bash
git clone <repo-url>
cd EventCity-Project
```

2. **Install dependencies**

```bash
npm install
npm i mysql
npm i mysql2
npm i express
npm i cors
npm i axios
```

## Configuration

- Check the configuration files (e.g., `config.js`) to add your Spotify and Ticketmaster API keys if needed.
- Adjust environment variables as required.

## Running the application

```bash
node index.js
```

The application will be accessible on the port defined in your configuration (default: http://localhost:3000).

## Technologies Used

- **Node.js**: JavaScript runtime environment for running the server-side application.
- **Express.js**: Minimalist web framework for Node.js, handles routes and HTTP requests.
- **SCSS/SASS**: CSS preprocessor for writing more modular and maintainable styles (`.scss` files).
- **JavaScript (ES6+)**: Main language for both client and server logic.
- **Spotify API**: For authentication and retrieving music data.
- **Ticketmaster API**: For searching and displaying events.
- **SQLite or other DBMS**: Database management (see scripts in `migration/`).

## Project Structure

- `public/`: Static files (HTML, CSS, JS)
- `routes/`: API route definitions
- `services/`: Business logic and data access
- `migration/`: Database creation scripts
- `config.js`: General configuration
- `index.js`: Server entry point

## Main Features

- Search for artists and events
- Spotify integration (authentication, search, etc.)
- Ticketmaster integration (events)
- User management

## License

See the LICENSE file for more information.
