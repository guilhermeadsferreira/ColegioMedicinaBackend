import { Router } from "express";
import deeplink from "node-deeplink";
import EmailController from "./controllers/EmailController";
import UserController from "./controllers/UserController";
import { MOCK_TOKEN } from "./consts";

const routes = Router();

routes.get(
  "/deeplink",
  deeplink({
    fallback: "https://cupsapp.com",
  })
);

routes.post("/session", UserController.session);

routes.post("/register", UserController.store);

routes.get(
  "/sendemailrecoverypassword/:email",
  EmailController.send_email_recovery_password
);

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

export default routes;
