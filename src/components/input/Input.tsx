import React, { ChangeEvent } from "react";

import { InputWrapper, InputStyled, Label, ErrorTip } from "./input.styled";

interface InputProps {
  type?: string | undefined;
  value: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  margin?: string;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  error,
  errorMessage = "error",
  value,
  setValue,
  label,
  placeholder = "",
  margin,
}) => {
  return (
    <InputWrapper style={{ margin: margin }}>
      {label && (
        <Label error={error}>
          {label}
          {error ? <ErrorTip>{errorMessage}</ErrorTip> : ""}
        </Label>
      )}
      <InputStyled
        error={error}
        type={type}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};
