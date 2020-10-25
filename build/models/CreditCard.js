"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');

const CreditCardSchema = new (0, _mongoose.Schema)(
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
    flag: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

exports. default = _mongoose.model.call(void 0, "CreditCard", CreditCardSchema);
