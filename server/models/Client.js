import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    city: String,
    state: String,
    country: String,
    company: String,
    phoneNumber: String,
  },
  { timestamps: true }
);

const Client = mongoose.model("client", ClientSchema); //change the user2 to other name for database name
export default Client;