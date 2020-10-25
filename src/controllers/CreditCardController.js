import CreditCard from "../models/CreditCard";
import { handle_response } from "../utils/handle_error";

class CreditCardController {
  async store(req, res) {
    try {
      await CreditCard.create(req.body);
      return res.status(200).json(handle_response("success", ""));
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }

  async delete(req, res) {
    try {
      await CreditCard.remove({ _id: req.params.id });
      return res.status(200).json(handle_response("success", ""));
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }

  async findAll(req, res) {
    try {
      const data = await CreditCard.find({
        user_id: req.params.id,
      });
      return res.status(200).json(handle_response("success", "", data));
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }

  async update(req, res) {
    try {
      await CreditCard.updateOne({ _id: req.body.id }, req.body);
      const data = await CreditCard.findById(req.body.id);
      return res.status(200).json(handle_response("success", "", data));
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }
}

export default new CreditCardController();
