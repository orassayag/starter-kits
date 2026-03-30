# Instructions

## Quick Start Guide

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or pnpm package manager
- IDE (VSCode recommended)
- Basic knowledge of React.js and Node.js

### General Setup

1. Navigate to the starter kit you want to use
2. Open the project in your IDE
3. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Starter Kit Categories

### Client-Only Kits

Located in `starter-kits/` directory with `client-` prefix.

**Setup:**
```bash
cd starter-kits/client-[kit-name]
npm install
npm start
```

The application will open at `http://localhost:3000`

**Available Commands:**
- `npm start` - Runs development server
- `npm run build` - Creates production build
- `npm test` - Runs tests (if configured)

### Server-Only Kits

Located in `starter-kits/` directory with `server-` prefix.

**Setup:**
```bash
cd starter-kits/server-[kit-name]
npm install
npm start
```

The server will typically run on `http://localhost:5000`

**Available Commands:**
- `npm start` - Starts the server
- `npm run debug` - Starts server in debug mode
- `npm stop` - Stops the server (Windows)

### Full-Stack Projects

Located in `starter-kits/` directory with `project-` prefix.

**Setup:**

1. Start the server:
   ```bash
   cd starter-kits/project-[name]/server
   npm install
   npm start
   ```

2. In a new terminal, start the client:
   ```bash
   cd starter-kits/project-[name]/client
   npm install
   npm start
   ```

### Example Projects

Located in `starter-kits/` directory with `example-` prefix.

These are focused demonstrations of specific React patterns or features. Follow the client-only setup instructions.

## Specific Kit Instructions

### Using External APIs (themoviedb)

For kits that use themoviedb API:
1. Create an account at [themoviedb.org](https://www.themoviedb.org)
2. Get your API key
3. Create a `.env` file in the project root
4. Add your API key:
   ```
   REACT_APP_API_KEY=your_api_key_here
   ```

### Using MongoDB Database

For `project-server-MONGO-database---client-hooks-redux-thunk`:

1. Install MongoDB locally or use MongoDB Atlas
2. Import the data from `Sources/dist` directory:
   ```bash
   cd starter-kits/project-server-MONGO-database---client-hooks-redux-thunk/server
   # Copy the dist folder from Sources/ to src/
   ```
3. Configure database connection in server settings
4. Start MongoDB service
5. Run the server

### Using Local JSON Files

For `project-server-JSON-files---client-hooks-redux-thunk`:

1. Copy the `dist` folder from `Sources/` directory
2. Paste it into `starter-kits/project-server-JSON-files---client-hooks-redux-thunk/server/src/`
3. Start the server

### Using Socket.io

For kits with Socket.io:

1. Start the server first (it will initialize Socket.io)
2. Then start the client
3. The client will automatically connect to the Socket.io server

## Configuration

### Client Configuration

Most client kits use Create React App configuration. You can customize:
- Port: Set `PORT` environment variable
- API endpoints: Configure in service files
- Proxy: Add proxy in `package.json`

### Server Configuration

Server configuration typically includes:
- Port settings
- Database connections
- API keys
- CORS settings

Check each server's configuration files for specific options.

## Troubleshooting

### Port Already in Use

If port 3000 (client) or 5000 (server) is in use:

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID [process_id] /F
```

**macOS/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### Dependencies Installation Issues

1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```
2. Delete `node_modules` and `package-lock.json`
3. Reinstall:
   ```bash
   npm install
   ```

### Build Errors

1. Check Node.js version compatibility
2. Ensure all dependencies are installed
3. Clear build cache:
   ```bash
   rm -rf build/
   npm run build
   ```

## Available Create React App Scripts

All client kits support these Create React App commands:

### `npm start`
Runs the app in development mode at `http://localhost:3000`

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
⚠️ **One-way operation!** Ejects from Create React App for full configuration control

## Learn More

### React Documentation
- [Create React App Documentation](https://create-react-app.dev/)
- [React Documentation](https://reactjs.org/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)

### State Management
- [Redux Documentation](https://redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [Redux Saga](https://redux-saga.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

### Node.js
- [Express.js Documentation](https://expressjs.com/)
- [Socket.io Documentation](https://socket.io/)
- [Mongoose Documentation](https://mongoosejs.com/)

## Templates

The `templates/` directory contains HTML and CSS snippets from [codepen](https://codepen.io) that can be used as UI components or inspiration.

## Sources

The `Sources/` directory contains data files for specific projects. See individual project README files for usage instructions.

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag
