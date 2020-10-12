import User from "../models/User";
import { handle_message_error } from "../utils/handle_error";
import NodeMailer from "../services/NodeMailer";
import { HTML_RECOVERY_PASSWORD } from "../consts";

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

    const mailOptions = {
      from: "'Colégio Medicina' guilherme.adsferreira@gmail.com", // sender address
      to: user.email, // list of receivers
      subject: "Recuperação de senha", // Subject line
      html: HTML_RECOVERY_PASSWORD(user._id), // plain text body
    };

    const result = await NodeMailer.send_email(mailOptions);

    if (!result) {
      return res.status(500).json(handle_message_error("E-mail não enviado."));
    }

    return res
      .status(200)
      .json({ status: "success", message: "E-mail enviado." });
  }
}

export default new EmailController();
