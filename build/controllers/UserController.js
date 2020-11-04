"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _BankData = require('../models/BankData'); var _BankData2 = _interopRequireDefault(_BankData);
var _CreditCard = require('../models/CreditCard'); var _CreditCard2 = _interopRequireDefault(_CreditCard);
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
          .json(_handle_error.handle_response.call(void 0, "error", "Usuário não encontrado."));
      }

      if (password !== user.password) {
        return res
          .status(500)
          .json(_handle_error.handle_response.call(void 0, "error", "Dados não conferem."));
      }

      return res.status(200).json({ user, token: _consts.MOCK_TOKEN });
    } catch (err) {
      return res.status(500).json(_handle_error.handle_response.call(void 0, "error"));
    }
  }

  async store(req, res) {
    try {
      const exists_user = await _User2.default.findOne({ email: req.body.email });

      if (exists_user) {
        return res
          .status(500)
          .json(
            _handle_error.handle_response.call(void 0, "error", "Este e-mail já possui um cadastrado.")
          );
      }

      const user = await _User2.default.create(req.body);

      await _BankData2.default.create({
        account_number: "123456",
        verifying_digit: "1",
        account_type: "Conta Corrente",
        agency_number: "0001",
        bank_number: "341 - Itaú Unibanco S/A.",
        user_id: user._id,
      });

      await _CreditCard2.default.create({
        user_id: user._id,
        card_holder: `${user.name} ${user.lastname}`,
        card_number: `4556 0918 5727 6876`,
        expires_at: "02/28",
        cvv: "985",
        billing_address: `Rua de Goiânia, nº 00 Setor Pedro Ludovico Goiânia - Goiás 74000-000`,
        flag: "Visa",
      });

      return res.status(200).json({ user, token: _consts.MOCK_TOKEN });
    } catch (err) {
      return res.status(500).json(_handle_error.handle_response.call(void 0, "error"));
    }
  }

  async resetpassword(req, res) {
    const { id, password, password_tip } = req.body;

    try {
      await _User2.default.updateOne(
        { _id: id },
        {
          password,
          password_tip,
        }
      );

      return res
        .status(200)
        .json(_handle_error.handle_response.call(void 0, undefined, "Senha resetada com sucesso."));
    } catch (err) {
      console.log(err);
      return res.status(500).json(_handle_error.handle_response.call(void 0, "error"));
    }
  }

  async update(req, res) {
    try {
      await _User2.default.updateOne({ _id: req.body.id }, req.body);
      const user = await _User2.default.findById(req.body.id);
      return res.status(200).json({ status: "success", data: user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(_handle_error.handle_response.call(void 0, "error"));
    }
  }

  async upload_avatar(req, res) {
    try {
      await _User2.default.updateOne(
        { _id: req.body.id },
        {
          avatar: `https://colegiomedicinaback.herokuapp.com/storage/${req.file.filename}`,
        }
      );
      const user = await _User2.default.findById(req.body.id);
      return res
        .status(200)
        .json({ status: "success", data: { token: _consts.MOCK_TOKEN, user } });
    } catch (err) {
      console.log(err);
      return res.status(500).json(_handle_error.handle_response.call(void 0, "error"));
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
    if (req.params.class) {
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

exports. default = new UserController();
