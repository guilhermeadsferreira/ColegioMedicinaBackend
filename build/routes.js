"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _EmailController = require('./controllers/EmailController'); var _EmailController2 = _interopRequireDefault(_EmailController);
var _UserController = require('./controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _BankDataController = require('./controllers/BankDataController'); var _BankDataController2 = _interopRequireDefault(_BankDataController);
var _CreditCardController = require('./controllers/CreditCardController'); var _CreditCardController2 = _interopRequireDefault(_CreditCardController);
var _AddressController = require('./controllers/AddressController'); var _AddressController2 = _interopRequireDefault(_AddressController);
var _PayerController = require('./controllers/PayerController'); var _PayerController2 = _interopRequireDefault(_PayerController);
var _consts = require('./consts');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

var storage = _multer2.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, _path.resolve.call(void 0, __dirname, "..", "storage"));
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + ext);
  },
});

var upload = _multer2.default.call(void 0, { storage: storage });
const routes = _express.Router.call(void 0, );

routes.get("/deeplink/:id", (req, res) => {
  res.redirect(`colegiomedicina://resetpassword/${req.params.id}`);
});

routes.post("/session", _UserController2.default.session);

routes.post("/register", _UserController2.default.store);

routes.get(
  "/sendemailrecoverypassword/:email",
  _EmailController2.default.send_email_recovery_password
);

routes.post("/resetpassword", _UserController2.default.resetpassword);

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

routes.put("/updateuserdata", _UserController2.default.update);

routes.post(
  "/uploadavatar",
  upload.single("uploaded_file"),
  _UserController2.default.upload_avatar
);

routes.get("/listclassschedule/:id", _UserController2.default.class_schedule);

routes.get("/listrecordedlessons/:class", _UserController2.default.recorded_lessons);

routes.get("/listattachments/:class", _UserController2.default.get_attachments);

// BankData

routes.post("/createbankdata", _BankDataController2.default.store);

routes.delete("/deletebankdata/:id", _BankDataController2.default.delete);

routes.get("/listbankdata/:id", _BankDataController2.default.findAll);

routes.put("/updatebankdata", _BankDataController2.default.update);

// CreditCard

routes.post("/createcreditcard", _CreditCardController2.default.store);

routes.delete("/deletecreditcard/:id", _CreditCardController2.default.delete);

routes.get("/listcreditcard/:id", _CreditCardController2.default.findAll);

routes.put("/updatecreditcard", _CreditCardController2.default.update);

// Address

routes.post("/createaddress", _AddressController2.default.store);

routes.delete("/deleteaddress/:id", _AddressController2.default.delete);

routes.get("/listaddresses/:id", _AddressController2.default.findAll);

routes.put("/updateaddress", _AddressController2.default.update);

// Payer

routes.post("/createpayer", _PayerController2.default.store);

routes.delete("/deletepayer/:id", _PayerController2.default.delete);

routes.get("/listpayers/:id", _PayerController2.default.findAll);

routes.put("/updatepayer", _PayerController2.default.update);

exports. default = routes;
