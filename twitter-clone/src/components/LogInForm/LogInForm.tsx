import React from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "../ui/TextField";
import { Form } from "../ui/Form";
import { useFormValidation, validationRules } from "../../hooks/useFormValidation";
import { useFetch } from "../../hooks/useFetch";
import { userService } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";

type LogInFormData = {
  username: string;
  password: string;
}

type FormField = {
  placeholder: string;
  name: keyof LogInFormData;
  type: string;
  autoComplete?: string;
}

const formFields: FormField[] = [
  { placeholder: "Username", name: "username", type: "text", autoComplete: "username" },
  { placeholder: "Password", name: "password", type: "password", autoComplete: "current-password" }
];

const initialValues: LogInFormData = {
  username: "",
  password: ""
};

const signUpValidationRules = {
  username: validationRules.username,
  password: validationRules.password,
};

const LogInForm: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  
  const {
    formData,
    errors,
    handleFieldChange,
    handleFieldBlur,
    validateAllFields
  } = useFormValidation({
    initialValues,
    validationRules: signUpValidationRules
  });

  const { execute, error: createUserError } = useFetch(userService.getUser);

  const onLogInFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isValid = validateAllFields();
    
    if (isValid) {
      try {
        const result = await execute(formData.username,);
        login(result);
        history.push('/tweets');
      } catch {
        return;
        // Error is already handled by useFetch hook
      }
    } else {
      console.log("Form has validation errors");
    }
  };

  return (
    <Form title="Log In" onSubmit={onLogInFormSubmit} buttonProps={{ children: "Log In" }}>
      {formFields.map((attrs) => {   
        return (
          <TextField
            key={attrs.name}
            {...attrs}
            error={errors[attrs.name]}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
          />
        );
      })}
      {createUserError && (<div style={{ color: 'red' }}>{createUserError}</div>)}
    </Form>
  );
}

export default LogInForm;