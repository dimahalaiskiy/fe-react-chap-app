import * as Yup from "yup";

export const emailValidator = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateMinLength = (value: string, length: number) => {
  return value.length !== 0 && value.length < length;
};

export const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required").min(3, "At least 3 characters"),
  displayName: Yup.string().required("Display name is required").min(3, "At least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .test("is-valid-email", "Invalid email format", (value) => emailValidator(value || "")),
  location: Yup.string().min(4, "At least 4 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Must be at least 6 characters")
    .max(16, "Cannot exceed 16 characters"),
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required").max(16, "Max length is 16 characters"),
  password: Yup.string().required("Password is required").max(16, "Max length is 16 characters"),
});
