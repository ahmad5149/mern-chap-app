const mongoose = require("mongoose");
console.log(process.env.MONGO_URI);
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Connection is success : ${connect.connection.host}`);
  } catch (err) {
    console.log("Error while connection", err.message);
    process.exit();
  }
};

module.exports = connectDB;
