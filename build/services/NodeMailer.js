"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _googleapis = require('googleapis');
const clientID =
  "981516025220-43c1e6fv9amoole9t8ehmtlp982nai47.apps.googleusercontent.com";
const clientSecret = "b5RdWlI7XS689N2WSdsa-45t";
const refresh_token =
  "1//04_kIhL9ZZEO7CgYIARAAGAQSNwF-L9Iru_MPT_UJ00gvf2tX2bJVJir9Uk7zhfnlXtGnjGuh1H9MdMfWeakaQtQ1okT1qAm4m7s";
const OAuth2 = _googleapis.google.auth.OAuth2;
const oauth2Client = new OAuth2(
  clientID, // ClientID
  clientSecret, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: refresh_token,
});

class NodeMailer {
  async get_transporter() {
    const accessToken = await oauth2Client.getAccessToken();

    var transporter = _nodemailer2.default.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "guilherme.adsferreira@gmail.com",
        clientId: clientID,
        clientSecret: clientSecret,
        refreshToken: refresh_token,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    return transporter;
  }

  async send_email(mailOptions) {
    const transporter = await this.get_transporter();
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          console.log(info);
          resolve(true);
        }
      });
    });
  }
}

exports. default = new NodeMailer();
