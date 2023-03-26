import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//db
import connectDB from "./db/connect.js";

//routes
import authRouter from "./routes/authRoute.js";
import jobsRouter from "./routes/jobsRoutes.js";

//middleware
app.use(cors({origin: "http://localhost:3000",
                Credentials: false
}));

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.json());
app.get("/", (req, res) => {
  res.send({ msg: "Hello World!" });
});
app.get("/api/v1", (req, res) => {
  res.json({ msg: "API is running..." });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
