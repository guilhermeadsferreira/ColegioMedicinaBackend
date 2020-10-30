import { Schema, model } from "mongoose";

const PayerSchema = new Schema(
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
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    company_name: {
      type: String,
      required: false,
    },
    responsible: {
      type: String,
      required: false,
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
      required: false,
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

export default model("Payer", PayerSchema);
