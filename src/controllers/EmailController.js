import User from "../models/User";
import { handle_message_error } from "../utils/handle_error";
import NodeMailer from "../services/NodeMailer";

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
      subject: "Teste", // Subject line
      html: `<!DOCTYPE html
      PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Demystifying Email Design</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
    
    <body style="background-color: #f5f5f5; text-align: center; padding-bottom: 20px">
          <a href="https://colegiomedicinaback.herokuapp.com/deeplink?url=colegiomedicina%3A%2F%2Fresetpassword%2F1" style="
                background-color: #030d4f;
                border: none;
                color: white;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 1em;
                padding: 2% 4%;
                cursor: pointer;
                border-radius: 4px;
                margin-bottom: 10px;
                max-width: 70%;
                max-height: 20%;
              ">RECUPERAR SENHA</a>
    </body>
    </html>`, // plain text body
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
