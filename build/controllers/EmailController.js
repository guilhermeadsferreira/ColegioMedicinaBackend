"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _handle_error = require('../utils/handle_error');
var _NodeMailer = require('../services/NodeMailer'); var _NodeMailer2 = _interopRequireDefault(_NodeMailer);
var _consts = require('../consts');

class EmailController {
  async send_email_recovery_password(req, res) {
    const user = await _User2.default.findOne({
      email: req.params.email,
    });

    if (!user) {
      return res
        .status(500)
        .json(_handle_error.handle_message_error.call(void 0, "E-mail não encontrado."));
    }

    const mailOptions = {
      from: "'Colégio Medicina' guilherme.adsferreira@gmail.com", // sender address
      to: user.email, // list of receivers
      subject: "Recuperação de senha", // Subject line
      html: _consts.HTML_RECOVERY_PASSWORD.call(void 0, user._id), // plain text body
    };

    const result = await _NodeMailer2.default.send_email(mailOptions);

    if (!result) {
      return res.status(500).json(_handle_error.handle_message_error.call(void 0, "E-mail não enviado."));
    }

    return res
      .status(200)
      .json({ status: "success", message: "E-mail enviado." });
  }
}

exports. default = new EmailController();
