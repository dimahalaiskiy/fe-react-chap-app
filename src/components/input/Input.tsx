import { ChangeEvent, forwardRef } from "react";

import { InputWrapper, InputStyled, Label, ErrorTip } from "./input.styled";

interface InputProps {
  type?: string | undefined;
  label?: string;
  placeholder?: string;
  name?: string;
  error?: boolean;
  errorMessage?: string;
  margin?: string;
  padding?: string;
  height?: string;
  value: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      label,
      name,
      placeholder = "",
      error,
      errorMessage = "error",
      margin,
      padding,
      height,
      value,
      setValue,
      onFocus,
    },
    ref,
  ) => {
    return (
      <InputWrapper style={{ margin }}>
        {label && (
          <Label error={error}>
            {label}
            {error ? <ErrorTip>{errorMessage}</ErrorTip> : ""}
          </Label>
        )}
        <InputStyled
          style={{ padding, height }}
          ref={ref}
          name={name}
          placeholder={placeholder}
          error={error}
          type={type}
          value={value}
          onChange={setValue}
          onFocus={onFocus}
        />
      </InputWrapper>
    );
  },
);
