"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _handle_error = require('../utils/handle_error');
var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);

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

    var transporter = _nodemailer2.default.createTransport({
      service: "gmail",
      auth: {
        user: "guilherme.adsferreira@gmail.com",
        pass: "Eventual0608@",
      },
    });

    const mailOptions = {
      from: "'Colégio Medicina' guilherme.adsferreira@gmail.com", // sender address
      to: "guilhermeadsf@gmail.com", // list of receivers
      subject: "Teste", // Subject line
      html: "<p>Your html here</p>", // plain text body
    };

    const result = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          console.log(info);
          resolve(true);
        }
      });
    });

    if (!result) {
      return res.status(500).json(_handle_error.handle_message_error.call(void 0, "E-mail não enviado."));
    }

    return res
      .status(200)
      .json({ status: "success", message: "E-mail enviado." });
  }
}

exports. default = new EmailController();
