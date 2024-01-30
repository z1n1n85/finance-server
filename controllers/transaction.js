import Transaction from "../schemes/transaction.js";

class TransactionController {
  async create(req, res) {
    try {
      const {time, type, tags, cost, accountId, description} = req.body;
      const userId = req.user.id;
      const transaction = await Transaction.create({userId, time, type, tags, cost, accountId, description});
      return res.status(200).json(transaction);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res) {
    try {
      const userId = req.user.id;
      const transactions = await Transaction.find({userId});
      return res.status(200).json(transactions);
    } catch (e) {
      next(e);
    }
  }
  async update(req, res) {
    try {
      const transaction = req.body;
      if (!transaction._id) {
        return res.status(400).json({message: 'ID не указан'});
      }
      const updateTransaction = await Transaction.findByIdAndUpdate(transaction._id, transaction, {new: true});
      return res.status(200).json(updateTransaction);
    } catch (e) {
      next(e);
    }
  }
  async delete(req, res) {
    try {
      const {id} = req.params;
      if (!id) {
        return res.status(400).json({message: 'ID не указан'});
      }
      const transaction = await Transaction.findByIdAndDelete(id);
      return res.status(200).json(transaction);
    } catch (e) {
      next(e);
    }
  }
}

export default new TransactionController();