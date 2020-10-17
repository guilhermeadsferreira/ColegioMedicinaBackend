"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
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
    const id = req.body.id;
    delete req.body.id;

    try {
      const user = await _User2.default.findByIdAndUpdate(req.body.id, req.body);

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

exports. default = new UserController();
