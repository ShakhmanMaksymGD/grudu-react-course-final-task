import React from "react";
import "./Typography.css";

type TypographyProps = {
  el: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Typography: React.FC<TypographyProps> = ({ el, children, className, style, ...props }) => {
  const classes = `grudu-typography-${el} ${className || ''}`.trim();
  return React.createElement(el, { className: classes, style, ...props }, children);
};

export default Typography;