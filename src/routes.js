import { Router } from "express";
import EmailController from "./controllers/EmailController";
import UserController from "./controllers/UserController";
import BankDataController from "./controllers/BankDataController";
import CreditCardController from "./controllers/CreditCardController";
import AddressController from "./controllers/AddressController";
import PayerController from "./controllers/PayerController";
import { MOCK_TOKEN } from "./consts";
import multer from "multer";
import { resolve } from "path";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolve(__dirname, "..", "storage"));
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + ext);
  },
});

var upload = multer({ storage: storage });
const routes = Router();

routes.get("/deeplink/:id", (req, res) => {
  res.redirect(`colegiomedicina://resetpassword/${req.params.id}`);
});

routes.post("/session", UserController.session);

routes.post("/register", UserController.store);

routes.get(
  "/sendemailrecoverypassword/:email",
  EmailController.send_email_recovery_password
);

routes.post("/resetpassword", UserController.resetpassword);

routes.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  if (authHeader.split(" ")[1] !== MOCK_TOKEN) {
    return res.status(401).json({ error: "Token inválido." });
  }

  return next();
});

routes.put("/updateuserdata", UserController.update);

routes.post(
  "/uploadavatar",
  upload.single("uploaded_file"),
  UserController.upload_avatar
);

routes.get("/listclassschedule/:id", UserController.class_schedule);

routes.get("/listrecordedlessons", UserController.recorded_lessons);

routes.get("/listattachments/:class", UserController.get_attachments);

// BankData

routes.post("/createbankdata", BankDataController.store);

routes.delete("/deletebankdata/:id", BankDataController.delete);

routes.get("/listbankdata/:id", BankDataController.findAll);

routes.put("/updatebankdata", BankDataController.update);

// CreditCard

routes.post("/createcreditcard", CreditCardController.store);

routes.delete("/deletecreditcard/:id", CreditCardController.delete);

routes.get("/listcreditcard/:id", CreditCardController.findAll);

routes.put("/updatecreditcard", CreditCardController.update);

// Address

routes.post("/createaddress", AddressController.store);

routes.delete("/deleteaddress/:id", AddressController.delete);

routes.get("/listaddresses/:id", AddressController.findAll);

routes.put("/updateaddress", AddressController.update);

// Payer

routes.post("/createpayer", PayerController.store);

routes.delete("/deletepayer/:id", PayerController.delete);

routes.get("/listpayers/:id", PayerController.findAll);

routes.put("/updatepayer", PayerController.update);

export default routes;
