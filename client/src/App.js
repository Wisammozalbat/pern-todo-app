import React from 'react'
import classes from './App.module.css';
import InputTodo from "./components/InputTodo"
import { Redirect, Route } from 'react-router-dom'
import EditTodo from './components/EditTodo';

function App() {
  return (
    <div className={classes.App}>
      <Route path="/todos" component={InputTodo} />
      <Route path="/todos/:id/edit" exact component={EditTodo} />
      <Route path="/" exact>
        <Redirect to={"/todos"} />
      </Route>
    </div>
  );
}

export default App;
