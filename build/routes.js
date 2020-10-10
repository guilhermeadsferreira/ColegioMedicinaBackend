"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('./controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

const routes = _express.Router.call(void 0, );

routes.post("/session", _UserController2.default.session);

routes.post("/register", _UserController2.default.store);

exports. default = routes;
