import User from "../models/User";
import { handle_message_error } from "../utils/handle_error";
import { MOCK_TOKEN } from "../consts";

class UserController {
  async session(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res
          .status(500)
          .json(handle_message_error("Usuário não encontrado."));
      }

      if (password !== user.password) {
        return res
          .status(500)
          .json(handle_message_error("Dados não conferem."));
      }

      return res.status(200).json({ user, token: MOCK_TOKEN });
    } catch (err) {
      return res.status(500).json(handle_message_error());
    }
  }

  async store(req, res) {
    try {
      const exists_user = await User.findOne({ email: req.body.email });

      if (exists_user) {
        return res
          .status(500)
          .json(handle_message_error("Este e-mail já possui um cadastrado."));
      }

      const user = await User.create(req.body);
      return res.status(200).json({ user, token: MOCK_TOKEN });
    } catch (err) {
      return res.status(500).json(handle_message_error());
    }
  }
}

export default new UserController();
