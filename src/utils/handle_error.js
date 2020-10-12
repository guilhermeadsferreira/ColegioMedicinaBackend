const MESSAGE_ERROR_DEFAULT =
  "Houve um erro de comunicação, tente novamente mais tarde.";

export const handle_response = (
  status = "success",
  message = MESSAGE_ERROR_DEFAULT
) => {
  return {
    status,
    message,
  };
};
