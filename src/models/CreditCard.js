import { Schema, model } from "mongoose";

const CreditCardSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    card_holder: {
      type: String,
      required: true,
    },
    card_number: {
      type: String,
      required: true,
    },
    expires_at: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    billing_address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("CreditCard", CreditCardSchema);
