import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TheLayout } from './components/TheLayout';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import TweetsPage from './pages/TweetsPage';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <TheLayout>
      <Switch>
        <GuestRoute exact path="/signup" component={SignUpPage} />
        <GuestRoute exact path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/tweets" component={TweetsPage} />
        <Route exact path="/">
          <Redirect to={isAuthenticated ? "/tweets" : "/signup"} />
        </Route>
      </Switch>
    </TheLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
