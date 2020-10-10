"use strict";Object.defineProperty(exports, "__esModule", {value: true});const MESSAGE_ERROR_DEFAULT =
  "Houve um erro de comunicação, tente novamente mais tarde.";

 const handle_message_error = (message = MESSAGE_ERROR_DEFAULT) => {
  return {
    status: "error",
    message,
  };
}; exports.handle_message_error = handle_message_error;
