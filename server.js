const { chats } = require("./data/data");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const connectDB = require("./config/db");
connectDB();
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
const { notFound } = require("./middleware/errorMiddleware");

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
