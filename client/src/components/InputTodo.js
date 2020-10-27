import React, {useState, useEffect} from 'react';
import ListTodos from './ListTodos'
import axios from '../axios-todos'

const InputTodo = (props) => {

    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);

    const getTodos = () => {
        axios.get("/todos")
        .then(resp => {
            setTodos(resp.data);
        })
        .catch(err => {
            console.error(err.message)
        })
    }

    useEffect(() => {
        getTodos();
    }, []);
    
    const onSubmitForm = async (e) => {
        e.preventDefault()
        axios.post("/todos", { description })
        .then(res => {
            console.log(res)
            getTodos()
        })
        .catch(err => {
            console.error(err.message)
        });
    }

    return(
        <React.Fragment>
            <h1>Pern Todo List</h1>
            <form className={'Form'} onSubmit={onSubmitForm}>
                <input type='text' className={'Input'} value={description} onChange={e => {setDescription(e.target.value)}}/>
                <button className={'SubmitButton'}>Add</button>
            </form>
            <ListTodos todos={todos} onEdit={getTodos}/>
        </React.Fragment>
    )
}

export default InputTodo;