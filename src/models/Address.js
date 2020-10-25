import { Schema, model } from "mongoose";

const AddressSchema = new Schema(
  {
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
      unique: true,
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
  },
  {
    timestamps: true,
  }
);

export default model("Address", AddressSchema);
