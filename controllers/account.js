import Account from "../schemes/account.js";

class AccountController {
  async create(req, res) {
    try {
      const {/*userName,*/ amountStart, amount, name} = req.body;
      const account = await Account.create({/*userName,*/ amountStart, amount, name});
      return res.status(200).json(account);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getAll(req, res) {
    try {
      const account = await Account.find();
      return res.status(200).json(account);
    } catch (error) {
      res.status(500).json(error);
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
      const account = await Account.findByIdAndDelete(id);
      return res.status(200).json(account);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new AccountController();