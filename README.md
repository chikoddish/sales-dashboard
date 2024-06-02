# Sales Dashboard Stack Application

ales Dashboard with a backend server built with Node.js, Express.js and a frontend client built with React.js.

## Project Structure

root
│
├── backend
│ ├── src
│ ├── package.json
│ └── ...
│
└── frontend
├── src
├── public
├── package.json
└── ...


- `backend`: Contains the backend server code.
- `frontend`: Contains the frontend client code.

## Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Setup Instructions

### Backend

1. Navigate to the `backend` directory: `cd backend`
2. Install the backend dependencies: `npm install`
3. Start the backend server in development mode: `npm run dev`

The backend server will start running on `http://localhost:8000` (or as specified in your backend configuration).

### Frontend

1. Open a new terminal and navigate to the `frontend` directory: `cd frontend`
2. Install the frontend dependencies: `npm install`
3. Start the frontend application: `npm start`

The frontend application will start running on `http://localhost:3000` (or as specified in your frontend configuration).

## Running the Application

To run the full application (both backend and frontend), you need to start both the backend and frontend servers. You can open two terminals and follow the instructions above to start each server.

1. In the first terminal, navigate to the `backend` directory and run: `cd backend` then `npm run dev`
2. In the second terminal, navigate to the `frontend` directory and run: `cd frontend` then `npm start`

Both servers should be running concurrently, with the backend server on port 5000 and the frontend server on port 3000.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. We welcome all contributions.

