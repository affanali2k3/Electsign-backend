import express from 'express';
import path from 'path'
import { Application } from 'express';
import DocumentShareRouter from './features/DocumentShare/router/DocumentSharingController';
import Database from './config/database';
import UserRouter from './features/User/router/UserRouter';
import cors from 'cors';
require("dotenv").config()

class App {
    public app: Application;
    // Initialize the application
    constructor() {
        this.app = express(); // Initialize Express
        this.databaseSync(); // Sync database models
        this.plugins(); // Configure Express plugins
        this.routes(); // Define API routes
    }
    protected plugins(): void {
        this.app.use(cors());
        this.app.use(express.json()); // Parse JSON requests
        this.app.use(express.static(path.join(__dirname, 'storage'))); // Serve static files from 'storage' directory
        this.app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
    }
    protected databaseSync(): void {
        const db = new Database(); // Initialize the database connection
        db.sequelize?.sync(); // Sync database models
    }
    protected routes(): void {
        // Define various API routes using routers
        this.app.use("/api/v1/shareDocument", DocumentShareRouter);
        this.app.use("/api/v1/user", UserRouter);
    }
}

const port: number = 8080;
const app = new App().app;

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log("✅ Server started successfully!");
});