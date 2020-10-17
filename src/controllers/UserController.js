import User from "../models/User";
import { handle_response } from "../utils/handle_error";
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
          .json(handle_response("error", "Usuário não encontrado."));
      }

      if (password !== user.password) {
        return res
          .status(500)
          .json(handle_response("error", "Dados não conferem."));
      }

      return res.status(200).json({ user, token: MOCK_TOKEN });
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }

  async store(req, res) {
    try {
      const exists_user = await User.findOne({ email: req.body.email });

      if (exists_user) {
        return res
          .status(500)
          .json(
            handle_response("error", "Este e-mail já possui um cadastrado.")
          );
      }

      const user = await User.create(req.body);
      return res.status(200).json({ user, token: MOCK_TOKEN });
    } catch (err) {
      return res.status(500).json(handle_response("error"));
    }
  }

  async resetpassword(req, res) {
    const { id, password, password_tip } = req.body;

    try {
      await User.updateOne(
        { _id: id },
        {
          password,
          password_tip,
        }
      );

      return res
        .status(200)
        .json(handle_response(undefined, "Senha resetada com sucesso."));
    } catch (err) {
      console.log(err);
      return res.status(500).json(handle_response("error"));
    }
  }

  async update(req, res) {
    const id = req.body.id;
    delete req.body.id;

    try {
      const user = await User.findByIdAndUpdate(req.body.id, req.body);

      return res.status(200).json({ status: "success", data: user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(handle_response("error"));
    }
  }

  async upload_avatar(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.body.id, {
        avatar: `https://colegiomedicinaback.herokuapp.com/storage/${req.file.filename}`,
      });

      return res.status(200).json({ status: "success", data: user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(handle_response("error"));
    }
  }

  async class_schedule(req, res) {
    return res.status(200).json([
      {
        subject: "Quimica",
        live: true,
        date: "10/jun",
        time: "10h30 am",
      },
      {
        subject: "Biologia",
        live: false,
        date: "10/jun",
        time: "10h30 am",
      },
      {
        subject: "Anatomia",
        live: false,
        date: "10/jun",
        time: "10h30 am",
      },
      {
        subject: "História",
        live: false,
        date: "10/jun",
        time: "10h30 am",
      },
    ]);
  }

  async recorded_lessons(req, res) {
    return res.status(200).json([
      {
        title: "Equação de 2º grau",
        image: "https://colegiomedicinaback.herokuapp.com/storage/Aula.png",
        subject: "Matemática",
      },
      {
        title: "Equação de 2º grau",
        image: "https://colegiomedicinaback.herokuapp.com/storage/Aula.png",
        subject: "Matemática",
      },
      {
        title: "Equação de 2º grau",
        image: "https://colegiomedicinaback.herokuapp.com/storage/Aula.png",
        subject: "Matemática",
      },
    ]);
  }
}

export default new UserController();
