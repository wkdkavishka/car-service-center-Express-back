// Import required modules
import express, { Request, Response, NextFunction } from "express"; // Import express and types
import mongoose from "mongoose"; // Import mongoose
import routes from "./routes/routes"; // Import routes
import cors from "cors"; // Uncomment if you decide to use CORS

// Configuration variables
const port: number = Number(process.env.PORT) || 4000;
// const dbName: string = "car_service";
const databasePath: string = `mongodb+srv://car-service:car-service-1998@carservice.wh7ki.mongodb.net/`;

// Initialize Express app
const app = express();

// Set mongoose to use strictQuery
// avoid deprecation warnings for mongo 7.x up
mongoose.set("strictQuery", true);

// Database connection -> if failed app crash
// server listener
mongoose.connect(databasePath);

app.listen(port, () => {
  console.log("Listening to PORT --> ", port);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Custom middleware to log request path and method
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(
    `Request from: ${req.get("referer") || req.get("origin")}, URL: ${
      req.protocol
    }://${req.get("host")}${req.originalUrl}, Method: ${req.method}`
  );
  next(); // Pass control to the next middleware/route handler
});

// Uncomment and configure CORS if needed
app.use(
  cors({
    origin: ["http://localhost:4200", "http://127.0.0.1:4200"], // adds a little security
    // methods: ["GET", "POST"],
  })
);

// Set up routes
app.use("/car_service", routes);
