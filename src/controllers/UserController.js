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
        teacher_name: "Joaquim",
      },
      {
        subject: "Biologia",
        live: false,
        date: "10/jun",
        time: "10h30 am",
        teacher_name: "Rodolfo",
      },
      {
        subject: "Anatomia",
        live: false,
        date: "10/jun",
        time: "10h30 am",
        teacher_name: "Ronaldo",
      },
      {
        subject: "História",
        live: false,
        date: "10/jun",
        time: "10h30 am",
        teacher_name: "Paula",
      },
    ]);
  }

  async recorded_lessons(req, res) {
    if (req.params.class !== "") {
      return res.status(200).json([
        {
          title: "Aula de Segunda-feira",
          image: "https://colegiomedicinaback.herokuapp.com/storage/Aula.png",
          subject: req.params.class,
        },
        {
          title: "Aula de Terça-feira",
          image: "https://colegiomedicinaback.herokuapp.com/storage/Aula.png",
          subject: req.params.class,
        },
        {
          title: "Aula de Quarta-feira",
          image: "https://colegiomedicinaback.herokuapp.com/storage/Aula.png",
          subject: req.params.class,
        },
        {
          title: "Aula de Quinta-feira",
          image: "https://colegiomedicinaback.herokuapp.com/storage/Aula.png",
          subject: req.params.class,
        },
      ]);
    } else {
      return res.status(200).json([
        {
          title: "Aula de Segunda-feira",
          image: "https://colegiomedicinaback.herokuapp.com/storage/Aula.png",
          subject: "Química",
        },
        {
          title: "Aula de Terça-feira",
          image: "https://colegiomedicinaback.herokuapp.com/storage/Aula.png",
          subject: "Biologia",
        },
        {
          title: "Aula de Quinta-feira",
          image: "https://colegiomedicinaback.herokuapp.com/storage/Aula.png",
          subject: "Anatomia",
        },
        {
          title: "Aula de Sexta-feira",
          image: "https://colegiomedicinaback.herokuapp.com/storage/Aula.png",
          subject: "História",
        },
      ]);
    }
  }

  async get_attachments(req, res) {
    return res.status(200).json([
      {
        title: "Título do Anexo 1",
        description: "Descritivo anexo 1",
        attachments:
          "https://colegiomedicinaback.herokuapp.com/storage/lista_matematica.pdf",
      },
      {
        title: "Título do Anexo 2",
        description: "Descritivo anexo 2",
        attachments:
          "https://colegiomedicinaback.herokuapp.com/storage/lista_matematica.pdf",
      },
      {
        title: "Título do Anexo 3",
        description: "Descritivo anexo 3",
        attachments:
          "https://colegiomedicinaback.herokuapp.com/storage/lista_matematica.pdf",
      },
      {
        title: "Título do Anexo 4",
        description: "Descritivo anexo 4",
        attachments:
          "https://colegiomedicinaback.herokuapp.com/storage/lista_matematica.pdf",
      },
    ]);
  }
}

export default new UserController();
