import React from "react";
import "./Textarea.css";

type TextareaName = string;

export type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onBlur'> & {
  error: string | null;
  name: TextareaName;
  onChange?: (name: TextareaName, value: string) => void;
  onBlur?: (name: TextareaName) => void;
};

const Textarea: React.FC<TextareaProps> = (props) => {
  const { onChange, onBlur, error, ...attrs } = props;
  
  const handleBlur = () => {
    if (onBlur) {
      onBlur(attrs.name);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(attrs.name, e.target.value);
    }
  };

  return (
    <div className={`grudu-textarea ${error ? 'grudu-textarea--invalid' : ''}`}>
      <textarea 
        {...attrs} 
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {error && <div className="grudu-textarea__error">{error}</div>}
    </div>
  );
};

export default Textarea;