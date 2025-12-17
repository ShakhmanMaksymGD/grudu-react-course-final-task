import React from "react";
import "./Button.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, ...attrs } = props;
  const classes = `grudu-button ${className || ''}`.trim();
  
  return (
    <button className={classes} {...attrs}>
      {children}
    </button>
  );
};

export default Button;