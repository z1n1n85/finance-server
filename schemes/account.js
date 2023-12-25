import mongoose from "mongoose";

const Account = new mongoose.Schema({
  // userName: {type: String, required: true},
  amountStart: {type: Number, required: true},
  amount: {type: Number, required: true},
  name: {type: String, required: true},
});

export default mongoose.model('Account', Account);