import Payer from "../models/Payer";
import { handle_response } from "../utils/handle_error";

class PayerController {
  async store(req, res) {
    try {
      await Payer.create(req.body);
      return res.status(200).json(handle_response("success", ""));
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }

  async delete(req, res) {
    try {
      await Payer.remove({ _id: req.params.id });
      return res.status(200).json(handle_response("success", ""));
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }

  async findAll(req, res) {
    try {
      const data = await Payer.find({
        user_id: req.params.id,
      });
      return res.status(200).json(handle_response("success", "", data));
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }

  async update(req, res) {
    try {
      await Payer.updateOne({ _id: req.body.id }, req.body);
      const data = await Payer.findById(req.body.id);
      return res.status(200).json(handle_response("success", "", data));
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }
}

export default new PayerController();
