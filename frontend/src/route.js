import React from "react";
import {Route,Switch} from "react-router-dom";
import List from './components/list';
import Create from './components/create';
import Edit from './components/Edit'

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

export default function RouterConfig() {
  return (
    <div>
     
     
      <Switch>
      <Route exact path="/" component={List}/>
      <Route path="/edit/:id" component={Edit}/>
      <Route path="/create" component={Create}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/list" component={List}/>
      <Route path="/signup" component={RegisterPage}/> 
       {/* <Route path="/delete/:id" component={DeleteTodo}/>  */}
    </Switch>
    </div>
  )
}