import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().matches(/^[A-Z].*/),
  age: yup.number().positive(),
  email: yup.string().email(),
  password: yup.string(),
  password2: yup.string(),
  gender: yup.string(),
  tc: yup.string() || yup.boolean(),
  file: yup.string(),
  country: yup.string(),
});
