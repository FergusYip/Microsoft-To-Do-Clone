import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import HomePage from './pages/HomePage';
import SidebarBody from './layouts/SidebarBody';
import ProtectedRoute from './routes/ProtectedRoute';
import UnprotectedRoute from './routes/UnprotectedRoute';
import {
  MyDayPage,
  ImportantPage,
  PlannedPage,
  TasksPage,
  LoginPage,
  RegisterPage,
  ListPage,
} from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <UnprotectedRoute path="/login" exact component={LoginPage} />
        <UnprotectedRoute path="/register" exact component={RegisterPage} />
        <SidebarBody>
          <ProtectedRoute path="/myday" exact component={MyDayPage} />
          <ProtectedRoute path="/important" exact component={ImportantPage} />
          <ProtectedRoute path="/planned" component={PlannedPage} />
          <ProtectedRoute path="/tasks" component={TasksPage} />
          <ProtectedRoute path="/list/:id" component={ListPage} />
        </SidebarBody>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
