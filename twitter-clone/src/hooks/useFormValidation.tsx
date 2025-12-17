import { useState } from 'react';
import * as EmailValidator from 'email-validator';

export type ValidationRule<T> = {
  [K in keyof T]: (value: string) => string | null;
};

export type ValidationErrors<T> = {
  [K in keyof T]: string | null;
};

export type UseFormValidationOptions<T> = {
  initialValues: T;
  validationRules: ValidationRule<T>;
};

export function useFormValidation<T extends Record<string, string>>({
  initialValues,
  validationRules
}: UseFormValidationOptions<T>) {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = null;
      return acc;
    }, {} as ValidationErrors<T>)
  );

  const validateField = (name: keyof T, value: string): string | null => {
    const validator = validationRules[name];
    return validator ? validator(value) : null;
  };

  const handleFieldChange = (name: string, value: string) => {
    const fieldName = name as keyof T;
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };

  const hasErrors = Object.values(errors).some(error => error !== null);

  const handleFieldBlur = (name: string) => {
    const fieldName = name as keyof T;
    const error = validateField(fieldName, formData[fieldName]);

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const validateAllFields = (): boolean => {
    const validationErrors = {} as ValidationErrors<T>;
    let hasErrors = false;

    Object.entries(formData).forEach(([key, value]) => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, value as string);
      validationErrors[fieldName] = error;
      if (error) hasErrors = true;
    });

    setErrors(validationErrors);
    
    return !hasErrors;
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors(Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = null;
      return acc;
    }, {} as ValidationErrors<T>));
  };

  return {
    formData,
    errors,
    handleFieldChange,
    handleFieldBlur,
    validateAllFields,
    resetForm,
    hasErrors,
  };
}

export const validationRules = {
  email: (value: string): string | null => {
    if (!EmailValidator.validate(value)) {
      return 'Invalid email address';
    }

    return null;
  },

  password: (value: string): string | null => {
    if (value.length < 8) {
      return 'Invalid password - minimum 8 characters required';
    }

    if (value.length > 256) {
      return 'Invalid password - maximum 256 characters allowed';
    }

    return null;
  },

  fullName: (value: string): string | null => {
    if (value.length < 1) {
      return 'Invalid full name - at least 1 character required';
    }

    if (value.length > 512) {
      return 'Invalid full name - maximum 512 characters allowed';
    }

    return null;
  },

  username: (value: string): string | null => {
    if (value.length < 1) {
      return 'Invalid username - at least 1 character required';
    }

    return null;
  },

  tweet: (value: string): string | null => {
    if (value.length < 1) {
      return 'Invalid tweet - at least 1 character required';
    }

    if (value.length > 140) {
      return 'Invalid tweet - maximum 140 characters allowed';
    }

    return null;
  },
};