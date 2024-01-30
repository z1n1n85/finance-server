import Account from "../schemes/account.js";

class AccountController {
  async create(req, res) {
    try {
      const {amountStart, amount, name} = req.body;
      const userId = req.user.id;
      const account = await Account.create({userId, amountStart, amount, name});
      return res.status(200).json(account);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res) {
    try {
      const userId = req.user.id;
      const accounts = await Account.find({userId});
      return res.status(200).json(accounts);
    } catch (e) {
      next(e);
    }
  }
  async update(req, res) {
    try {
      const account = req.body;
      if (!account._id) {
        return res.status(400).json({message: 'ID не указан'});
      }
      const updateAccount = await Account.findByIdAndUpdate(account._id, account, {new: true});
      return res.status(200).json(updateAccount);
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
      const account = await Account.findByIdAndDelete(id);
      return res.status(200).json(account);
    } catch (e) {
      next(e);
    }
  }
}

export default new AccountController();