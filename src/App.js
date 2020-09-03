import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import HomePage from './pages/HomePage';
import SidebarBody from './layouts/SidebarBody';
import TodoList from './components/TodoList/index';
import ProtectedRoute from './ProtectedRoute';
import {
  MyDayPage,
  ImportantPage,
  PlannedPage,
  TasksPage,
  LoginPage,
  RegisterPage,
} from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <SidebarBody>
          <ProtectedRoute path="/myday" exact component={MyDayPage} />
          <ProtectedRoute path="/important" exact component={ImportantPage} />
          <ProtectedRoute path="/planned" component={PlannedPage} />
          <ProtectedRoute path="/tasks" component={TasksPage} />
          <ProtectedRoute path="/list/:id" component={TodoList} />
        </SidebarBody>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
