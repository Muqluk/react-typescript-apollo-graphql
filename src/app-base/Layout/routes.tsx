import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import YglUsers from '@domains/ygl-live/ygl-users';
// import ToDoClass from 'src/domains/to-do/to-do-class-example';
// import ToDoFunctional from 'src/domains/to-do/to-do-functional-example';
import { Home } from '../../pages/home';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    {/* <Route exact path="/ygl-users" component={YglUsers} /> */}
    {/* <Route exact path="/todo-func" component={ToDoFunctional} />
    <Route path="/todo-class" component={ToDoClass} /> */}
  </Switch>
);
