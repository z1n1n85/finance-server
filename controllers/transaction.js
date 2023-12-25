import Transaction from "../schemes/transaction.js";

class TransactionController {
  async create(req, res) {
    try {
      const {/*userName,*/ time, type, tags, cost, accountId, description} = req.body;
      const transaction = await Transaction.create({/*userName,*/ time, type, tags, cost, accountId, description});
      return res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getAll(req, res) {
    try {
      const transactions = await Transaction.find();
      return res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json(error);
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
    } catch (error) {
      res.status(500).json(error);
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
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new TransactionController();