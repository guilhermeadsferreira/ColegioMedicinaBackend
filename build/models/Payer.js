"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');

const PayerSchema = new (0, _mongoose.Schema)(
  {
    user_id: {
      type: String,
      required: true,
    },
    person_type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    cpf_cnpj: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birth_date: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    cep: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    complement: {
      type: String,
      required: true,
    },
    neighborhood: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    bank_number: {
      type: String,
      required: true,
    },
    account_type: {
      type: String,
      required: true,
    },
    agency_number: {
      type: String,
      required: true,
    },
    account_number: {
      type: String,
      required: true,
    },
    verifying_digit: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

exports. default = _mongoose.model.call(void 0, "Payer", PayerSchema);
