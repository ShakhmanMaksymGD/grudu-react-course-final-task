import React from 'react';
import { LogInForm } from '../components/LogInForm';
import Typography from '../components/ui/Typography';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <LogInForm />
      <div style={{ marginTop: "22px", display: "inline-block" }}>
        <Typography el="span" >
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </div>
    </div>
  );
};

export default LoginPage;