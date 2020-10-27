import React from 'react';
import EditTodo from './EditTodo';
import {Route, withRouter} from 'react-router-dom'
import './ListTodos.css'
import axios from '../axios-todos'

const ListTodos = (props) => {

    let {todos, onEdit} = props;

    const onDeleteTodoHandler = async (id) => {
        axios.delete("/todos/" + id)
        .then(resp => {
            onEdit();
        })
        .catch(err => {
            console.error(err.message)
        });
    }

    return (
        <React.Fragment>
            <table className={"Table"}>
                <thead className={"Table-Head"}>
                    <tr className={"Head-Row"}>
                        <th className={"Table-Header"}>Description</th>
                        <th className={"Table-Header"}>Edit</th>
                        <th className={"Table-Header"}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => {
                        return(
                            <tr key={todo.todo_id} >
                                <td className={"Table-Column"}>{todo.description}</td>
                                <td className={"Table-Column"}><button className={"Edit-btn btn"} onClick={()=>props.history.push("/todos/" + todo.todo_id + "/edit")}>Edit</button></td>
                                <td className={"Table-Column"}><button className={"Delete-btn btn"} onClick={() => onDeleteTodoHandler(todo.todo_id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Route path={props.match.path + '/todos/:id/edit'} component={EditTodo}/>
        </React.Fragment>
    )
}

export default withRouter(ListTodos);