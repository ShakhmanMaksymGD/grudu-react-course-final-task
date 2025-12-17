import React from "react";
import Typography from "../Typography";
import "./Form.css";
import { Button } from "../Button";

type FormProps = {
  title: string;
  children: React.ReactNode;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
  };
} & React.FormHTMLAttributes<HTMLFormElement>;

const Form: React.FC<FormProps> = (props) => {
  const { onSubmit, children, title, buttonProps, ...attrs } = props;
  const { children: buttonChildren = "Submit", ...buttonAttrs } = buttonProps || {};
  return (
    <div className="grudu-form">
      <Typography el="h2" className="grudu-form__title">{title}</Typography>
      <form className="grudu-form__form" onSubmit={onSubmit} {...attrs}>
        {children}
        <Button className="grudu-form__submit-button" type="submit" {...buttonAttrs}>{buttonChildren}</Button>
      </form>
    </div>
  );
};

export default Form;