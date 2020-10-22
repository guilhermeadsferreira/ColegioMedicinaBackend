import BankData from "../models/BankData";
import { handle_response } from "../utils/handle_error";

class BankDataController {
  async store(req, res) {
    try {
      await BankData.create(req.body);
      return res.status(200).json(handle_response("success", ""));
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }

  async delete(req, res) {
    try {
      await BankData.remove({ _id: req.params.id });
      return res.status(200).json(handle_response("success", ""));
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }

  async findAll(req, res) {
    try {
      const data = await BankData.find({
        user_id: req.params.id,
      });
      return res.status(200).json(handle_response("success", "", data));
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }

  async update(req, res) {
    try {
      await BankData.updateOne({ _id: req.body.id }, req.body);
      const data = await BankData.findById(req.body.id);
      return res.status(200).json(handle_response("success", "", data));
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }
}

export default new BankDataController();
