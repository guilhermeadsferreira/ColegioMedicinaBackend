"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _BankData = require('../models/BankData'); var _BankData2 = _interopRequireDefault(_BankData);
var _handle_error = require('../utils/handle_error');

class BankDataController {
  async store(req, res) {
    try {
      await _BankData2.default.create(req.body);
      return res.status(200).json(_handle_error.handle_response.call(void 0, "success", ""));
    } catch (err) {
      return res.status(500).json(_handle_error.handle_response.call(void 0, "error"));
    }
  }

  async delete(req, res) {
    try {
      await _BankData2.default.remove({ _id: req.params.id });
      return res.status(200).json(_handle_error.handle_response.call(void 0, "success", ""));
    } catch (err) {
      return res.status(500).json(_handle_error.handle_response.call(void 0, "error"));
    }
  }

  async findAll(req, res) {
    try {
      const data = await _BankData2.default.find({
        user_id: req.params.id,
      });
      return res.status(200).json(_handle_error.handle_response.call(void 0, "success", "", data));
    } catch (err) {
      return res.status(500).json(_handle_error.handle_response.call(void 0, "error"));
    }
  }

  async update(req, res) {
    try {
      await _BankData2.default.updateOne({ _id: req.body.id }, req.body);
      const data = await _BankData2.default.findById(req.body.id);
      return res.status(200).json(_handle_error.handle_response.call(void 0, "success", "", data));
    } catch (err) {
      return res.status(500).json(_handle_error.handle_response.call(void 0, "error"));
    }
  }
}

exports. default = new BankDataController();
