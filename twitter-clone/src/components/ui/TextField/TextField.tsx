import React from "react";
import "./TextField.css";

type TextFieldName = string;

export type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> & {
  error: string | null;
  name: TextFieldName;
  onChange?: (name: TextFieldName, value: string) => void;
  onBlur?: (name: TextFieldName) => void;
};

const TextField: React.FC<TextFieldProps> = (props) => {
  const { onChange, onBlur, error, ...attrs } = props;
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(attrs.name);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(attrs.name, e.target.value);
    }
  };

  return (
    <div className={`grudu-text-field ${error ? 'grudu-text-field--invalid' : ''}`}>
      <input 
        {...attrs} 
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {error && <div className="grudu-text-field__error">{error}</div>}
    </div>
  );
};

export default TextField;