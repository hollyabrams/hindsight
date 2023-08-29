import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';
import ProfileForm from './forms/ProfileForm';
import Dashboard from './pages/Dashboard';
import ProjectPage from './pages/ProjectPage';
import ProjectForm from './forms/ProjectForm';
import RetrospectivePage from './pages/RetrospectivePage';
import RetrospectiveForm from './forms/RetrospectiveForm';

const Routes = ({ login, register }) => {
  return (
    <>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>
          <Route exact path="/register">
            <RegisterForm register={register} />
          </Route>
          <Route exact path="/profile">
            <ProfileForm />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/add-project">
            <ProjectForm />
          </Route>
          <Route exact path="/projects">
            <ProjectPage />
          </Route>
          <Route exact path="/retrospectives">
            <RetrospectivePage />
          </Route>
          <Route exact path="/start-retrospective">
            <RetrospectiveForm />
          </Route>
      </Switch>
    </>
  );
};

export default Routes;
