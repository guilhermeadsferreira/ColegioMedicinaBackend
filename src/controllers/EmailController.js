import User from "../models/User";
import { handle_message_error } from "../utils/handle_error";
import nodemailer from "nodemailer";

class EmailController {
  async send_email_recovery_password(req, res) {
    const user = await User.findOne({
      email: req.params.email,
    });

    if (!user) {
      return res
        .status(500)
        .json(handle_message_error("E-mail não encontrado."));
    }

    var transporter = nodemailer.createTransport({
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
      return res.status(500).json(handle_message_error("E-mail não enviado."));
    }

    return res
      .status(200)
      .json({ status: "success", message: "E-mail enviado." });
  }
}

export default new EmailController();
