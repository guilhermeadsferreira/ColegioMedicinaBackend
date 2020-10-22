const MESSAGE_ERROR_DEFAULT =
  "Houve um erro de comunicação, tente novamente mais tarde.";

export const handle_response = (
  status = "success",
  message = MESSAGE_ERROR_DEFAULT,
  data = false
) => {
  const obj = {
    status,
    message,
  };

  if (data) {
    obj.data = data;
  }

  return obj;
};
