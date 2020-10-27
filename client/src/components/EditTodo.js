import React, { useCallback, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import axios from '../axios-todos'

import "./EditTodo.css"

const EditTodo = props => {
    
    const [todo, setTodo] = useState({description: ''})
    
    const editTodoHandler = async () => {
        axios.put("/todos/" + id, { description: todo.description })
        .then(res => {
            console.log(res);
            // props.onEdit();
            props.history.replace("/");
        })
        .catch(err => {
            console.error(err.message)
        });
    }
    
    let { id } = useParams();
    
    const getEditData = useCallback(() => {
        console.log(id)
        axios.get("/todos/" + id)
        .then(res => {
            setTodo(res.data)
        }).catch(err => {
            console.error(err.message)
        })
    }, [id])
    
    useEffect(()=>{
        getEditData();
    },[getEditData])

    return (
        <React.Fragment>
            <div
                className={"ModalContainer"}
                style={{ display:"block" }}
                >
                <div className={"Backdrop"} onClick={()=>props.history.replace("/todos")}></div>
                <div className={"Modal"}>
                    <div className={"TitleContainer"}>Edit Modal</div>
                    <div className={"ModalBody"}>
                        <input type="text" value={todo.description} onChange={(e) => setTodo({...todo, description: e.target.value})}/>
                    </div>
                    <button onClick={editTodoHandler}>Edit</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EditTodo;