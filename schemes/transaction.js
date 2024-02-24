import mongoose from "mongoose";

const Transaction = new mongoose.Schema({
  userId: {type: String, required: true},
  time: {type: String, required: true},
  type: {type: String, required: true},
  tags: [{type: String, required: false}],
  cost: {type: Number, required: true},
  accountId: {type: String, required: true},
  description: {type: String, required: false},
});

export default mongoose.model('Transaction', Transaction);