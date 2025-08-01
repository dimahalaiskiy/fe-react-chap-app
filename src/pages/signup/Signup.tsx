import { useNavigate, Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field, FormikHelpers } from "formik";
import { CoreApiProvider } from "@/services/api";

import { Form } from "./signup.styled";
import { Input } from "@/components/input/Input";
import { Button } from "@/components/button/Button";
import { Wrapper, Text } from "@/pages/login/login.styled";
import Spinner from "@/components/spinner/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { showSuccessToast, showErrorToast } from "@/utils/toastUtils";
import { SignupSchema } from "@/utils/schemas";

interface SignupFormValues {
  username: string;
  displayName: string;
  email: string;
  location: string;
  password: string;
  confirmPassword: string;
}

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserProfile } = useAuth();

  const initialValues: SignupFormValues = {
    username: "",
    displayName: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: SignupFormValues,
    { setSubmitting }: FormikHelpers<SignupFormValues>,
  ) => {
    try {
      const {
        data: { user },
      } = await CoreApiProvider.register({
        email: values.email,
        username: values.username,
        displayName: values.displayName,
        location: values.location,
        password: values.password,
      });

      setIsAuthenticated(true);
      setUserProfile({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        avatar: user.avatar,
        password: user.password,
        createdAt: user.createdAt,
        location: user.location,
      });

      showSuccessToast("Profile created successfully");
      navigate("/");
    } catch (error: any) {
      showErrorToast(error.response?.data.message || "Registration failed");
      console.error("Registration error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form as={FormikForm}>
            <Field name="username">
              {({ field, meta }: any) => (
                <Input
                  margin="0px 0px 18px 0px"
                  label="username"
                  name="username"
                  value={field.value}
                  error={meta.touched && meta.error}
                  errorMessage={meta.error}
                  setValue={(e) => field.onChange(e)}
                  onFocus={() => field.onBlur}
                />
              )}
            </Field>
            <Field name="displayName">
              {({ field, meta }: any) => (
                <Input
                  margin="0px 0px 18px 0px"
                  label="display name"
                  name="displayName"
                  value={field.value}
                  error={meta.touched && meta.error}
                  errorMessage={meta.error}
                  setValue={(e) => field.onChange(e)}
                  onFocus={() => field.onBlur}
                />
              )}
            </Field>
            <Field name="email">
              {({ field, meta }: any) => (
                <Input
                  type="email"
                  margin="0px 0px 18px 0px"
                  label="email"
                  name="email"
                  value={field.value}
                  error={meta.touched && meta.error}
                  errorMessage={meta.error}
                  setValue={(e) => field.onChange(e)}
                  onFocus={() => field.onBlur}
                />
              )}
            </Field>
            <Field name="location">
              {({ field, meta }: any) => (
                <Input
                  type="text"
                  margin="0px 0px 18px 0px"
                  label="location (optional)"
                  name="location"
                  value={field.value}
                  error={meta.touched && meta.error}
                  errorMessage={meta.error}
                  setValue={(e) => field.onChange(e)}
                  onFocus={() => field.onBlur}
                />
              )}
            </Field>
            <Field name="password">
              {({ field, meta }: any) => (
                <Input
                  type="password"
                  margin="0px 0px 18px 0px"
                  label="password"
                  name="password"
                  value={field.value}
                  error={meta.touched && meta.error}
                  errorMessage={meta.error}
                  setValue={(e) => field.onChange(e)}
                  onFocus={() => field.onBlur}
                />
              )}
            </Field>
            <Field name="confirmPassword">
              {({ field, meta }: any) => (
                <Input
                  type="password"
                  margin="0px 0px 18px 0px"
                  label="repeat password"
                  name="confirmPassword"
                  value={field.value}
                  error={meta.touched && meta.error}
                  errorMessage={meta.error}
                  setValue={(e) => field.onChange(e)}
                  onFocus={() => field.onBlur}
                />
              )}
            </Field>
            <Button type="submit" text="Sign up" margin="18px 0px 0px 0px" disabled={isSubmitting}>
              {isSubmitting && <Spinner margin="0px 0px 0px 20px" />}
            </Button>
            <Text>
              <span>Already has account?</span>
              <button>
                <Link to="/login">Login here</Link>
              </button>
            </Text>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
