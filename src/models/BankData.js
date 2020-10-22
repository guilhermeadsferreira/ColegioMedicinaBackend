import { Schema, model } from "mongoose";

const BankDataSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    account_number: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    agency_number: {
      type: String,
      required: true,
    },
    bank_number: {
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

export default model("BankData", BankDataSchema);
