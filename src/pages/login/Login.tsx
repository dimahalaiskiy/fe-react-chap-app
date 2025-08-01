import { useNavigate, Link, Navigate } from "react-router-dom";
import { Formik, Form as FormikForm, Field, FormikHelpers } from "formik";
import { CoreApiProvider } from "@/services/api";

import { Input } from "@/components/input/Input";
import { Button } from "@/components/button/Button";
import Spinner from "@/components/spinner/Spinner";

import { Wrapper, Form, Text } from "./login.styled";
import { useAuth } from "@/hooks/useAuth";
import { showSuccessToast, showErrorToast } from "@/utils/toastUtils";
import { LoginSchema } from "@/utils/schemas";

interface LoginFormValues {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUserProfile } = useAuth();

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
  ) => {
    try {
      const {
        data: { user },
      } = await CoreApiProvider.login({
        username: values.username.trim(),
        password: values.password.trim(),
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

      showSuccessToast("Welcome back!");
      navigate("/");
    } catch (error: any) {
      console.log(" error", error);
      showErrorToast(error.response?.data.message || "Login failed");
      setIsAuthenticated(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Wrapper>
      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form as={FormikForm}>
            <Field name="username">
              {({ field, meta }: any) => (
                <Input
                  type="text"
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
            <Button type="submit" text="Join" margin="18px 0px 0px 0px" disabled={isSubmitting}>
              {isSubmitting && <Spinner margin="0px 0px 0px 20px" />}
            </Button>
            <Text>
              <span>New here?</span>
              <Link to="/register">Register</Link>
            </Text>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
