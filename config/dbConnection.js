const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    // const connect = await mongoose.connect(
    //   "mongodb+srv://admin:admin@dipeshcluster.ssctvog.mongodb.net/my-loyalty-backend?retryWrites=true&w=majority"
    // );

    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
