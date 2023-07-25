import React, { useState, FormEvent, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";

import { emailValidator } from "../../utils/helpers/validateEmail";
import api from "../../services/api/core";
import { AuthContext } from "../../context/AuthProvider";

import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import Spinner from "../../components/spinner/Spinner";

import { Wrapper, Form, Text } from "./login.styled";

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUserProfile } = useContext(
    AuthContext
  ) as AuthContext;
  const isValidForm = emailValidator(email) && password.length >= 1;

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    loginUser();
  };

  const handleInputKeyDown = (event: any) => {
    event.preventDefault();
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const loginUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });
      setIsAuthenticated(true);
      setUserProfile({
        nickname: data.user.nickname,
        email: data.user.email,
        avatar: data.user.avatar,
      });
      navigate("/");
    } catch (error) {
      console.log("error", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Wrapper>
      <Form onSubmit={(event: FormEvent) => handleInputKeyDown(event)}>
        <Input
          type="email"
          margin="0px 0px 18px 0px"
          label="email"
          value={email}
          error={!isValidEmail}
          errorMessage="invalid email"
          setValue={(e) => {
            setEmail(e.currentTarget.value);
            if (!isValidEmail) setIsValidEmail(false);
          }}
        />
        <Input
          type="password"
          margin="0px 0px 18px 0px"
          label="password"
          value={password}
          error={password.length > 16}
          errorMessage="max length is 16 symbols"
          setValue={(e) => setPassword(e.currentTarget.value)}
        />
        <Button
          type="submit"
          text="Join"
          margin="18px 0px 0px 0px"
          disabled={!isValidForm}
          onClick={loginUser}
        >
          {isLoading && <Spinner margin="0px 0px 0px 20px" />}
        </Button>
        <Text>
          <span>Are You a New Member?</span>
          <Link to="/register">Register Here</Link>
        </Text>
      </Form>
    </Wrapper>
  );
};
