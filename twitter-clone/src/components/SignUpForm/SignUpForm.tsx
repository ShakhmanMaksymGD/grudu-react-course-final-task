import React from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "../ui/TextField";
import { Form } from "../ui/Form";
import { useFormValidation, validationRules } from "../../hooks/useFormValidation";
import { useFetch } from "../../hooks/useFetch";
import { userService } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

type FormField = {
  placeholder: string;
  name: keyof SignUpFormData;
  type: string;
  autoComplete?: string;
}

const formFields: FormField[] = [
  { placeholder: "Email", name: "email", type: "email", autoComplete: "username" },
  { placeholder: "Password", name: "password", type: "password", autoComplete: "current-password" },
  { placeholder: "Username", name: "username", type: "text" },
  { placeholder: "Full Name", name: "fullName", type: "text" }
];

const initialValues: SignUpFormData = {
  username: "",
  email: "",
  password: "",
  fullName: ""
};

const signUpValidationRules = {
  username: validationRules.username,
  email: validationRules.email,
  password: validationRules.password,
  fullName: validationRules.fullName
};

const SignUpForm: React.FC = () => {
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

  const { execute, error: createUserError } = useFetch(userService.createUser);

  const onSignUpFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isValid = validateAllFields();
    
    if (isValid) {
      const payload = {
        id: formData.username,
        name: formData.fullName,
        email: formData.email,
      };

      try {
        const result = await execute(payload);
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
    <Form title="Sign Up" onSubmit={onSignUpFormSubmit} buttonProps={{ children: "Sign Up" }}>
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

export default SignUpForm;