import { DetailedHTMLProps, HTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input = (props: InputProps) => {
  return (
    <input
      type={props.type}
      {...register("tel", {
        required: "Телефон обязателен к заполнению",
        pattern: {
          value: /[+7|8]\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
          message: "Неверный формат телефона",
        },
      })}
      onKeyDown={props.onKeyDown}
      onInput={props.onInput}
      onPaste={props.onPaste}
    />
  );
};
