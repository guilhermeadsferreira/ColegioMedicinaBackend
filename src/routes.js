import { Router } from "express";
import EmailController from "./controllers/EmailController";
import UserController from "./controllers/UserController";
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

routes.get("/listrecordedlessons/:id", UserController.recorded_lessons);

export default routes;
