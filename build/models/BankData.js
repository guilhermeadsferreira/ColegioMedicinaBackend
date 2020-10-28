"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');

const BankDataSchema = new (0, _mongoose.Schema)(
  {
    user_id: {
      type: String,
      required: true,
    },
    account_number: {
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

exports. default = _mongoose.model.call(void 0, "BankData", BankDataSchema);
