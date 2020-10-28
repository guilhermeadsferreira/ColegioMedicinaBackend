import User from "../models/User";
import BankData from "../models/BankData";
import CreditCard from "../models/CreditCard";
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

      await BankData.create({
        account_number: "123456",
        verifying_digit: "1",
        account_type: "Conta Corrente",
        agency_number: "0001",
        bank_number: "341 - Itaú Unibanco S/A.",
        user_id: user._id,
      });

      await CreditCard.create({
        user_id: user._id,
        card_holder: `${user.name} ${user.lastname}`,
        card_number: `4556 0918 5727 6876`,
        expires_at: "02/28",
        cvv: "985",
        billing_address: `Rua de Goiânia, nº 00 Setor Pedro Ludovico Goiânia - Goiás 74000-000`,
        flag: "Visa",
      });

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
    try {
      await User.updateOne({ _id: req.body.id }, req.body);
      const user = await User.findById(req.body.id);
      return res.status(200).json({ status: "success", data: user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(handle_response("error"));
    }
  }

  async upload_avatar(req, res) {
    try {
      await User.updateOne(
        { _id: req.body.id },
        {
          avatar: `https://colegiomedicinaback.herokuapp.com/storage/${req.file.filename}`,
        }
      );
      const user = await User.findById(req.body.id);
      return res
        .status(200)
        .json({ status: "success", data: { token: MOCK_TOKEN, user } });
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
