"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _nodedeeplink = require('node-deeplink'); var _nodedeeplink2 = _interopRequireDefault(_nodedeeplink);
var _EmailController = require('./controllers/EmailController'); var _EmailController2 = _interopRequireDefault(_EmailController);
var _UserController = require('./controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _consts = require('./consts');

const routes = _express.Router.call(void 0, );

routes.get("/deeplink", (req, res) => {
  res.redirect("colegiomedicina://resetpassword/1");
});

routes.post("/session", _UserController2.default.session);

routes.post("/register", _UserController2.default.store);

routes.get(
  "/sendemailrecoverypassword/:email",
  _EmailController2.default.send_email_recovery_password
);

routes.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  if (authHeader.split(" ")[1] !== _consts.MOCK_TOKEN) {
    return res.status(401).json({ error: "Token inválido." });
  }

  return next();
});

exports. default = routes;
