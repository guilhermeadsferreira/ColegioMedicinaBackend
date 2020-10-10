"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _handle_error = require('../utils/handle_error');
var _consts = require('../consts');

class UserController {
  async session(req, res) {
    const { email, password } = req.body;

    try {
      const user = await _User2.default.findOne({
        email,
      });

      if (!user) {
        return res
          .status(500)
          .json(_handle_error.handle_message_error.call(void 0, "Usuário não encontrado."));
      }

      if (password !== user.password) {
        return res
          .status(500)
          .json(_handle_error.handle_message_error.call(void 0, "Dados não conferem."));
      }

      return res.status(200).json({ user, token: _consts.MOCK_TOKEN });
    } catch (err) {
      return res.status(500).json(_handle_error.handle_message_error.call(void 0, ));
    }
  }

  async store(req, res) {
    try {
      const exists_user = await _User2.default.findOne({ email: req.body.email });

      if (exists_user) {
        return res
          .status(500)
          .json(_handle_error.handle_message_error.call(void 0, "Este e-mail já possui um cadastrado."));
      }

      const user = await _User2.default.create(req.body);
      return res.status(200).json({ user, token: _consts.MOCK_TOKEN });
    } catch (err) {
      return res.status(500).json(_handle_error.handle_message_error.call(void 0, ));
    }
  }
}

exports. default = new UserController();
