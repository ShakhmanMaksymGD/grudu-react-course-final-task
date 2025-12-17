import React from 'react';
import { SignUpForm } from '../components/SignUpForm';
import Typography from '../components/ui/Typography';
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  return (
    <div className="sign-up-page">
      <SignUpForm />
      <div style={{ marginTop: "22px", display: "inline-block" }}>
        <Typography el="span" >
          Already have an account? <Link to="/login">Log In</Link>
        </Typography>
      </div>
    </div>
  );
};

export default SignUpPage;