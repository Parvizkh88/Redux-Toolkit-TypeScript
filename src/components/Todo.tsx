import React from 'react'
import {TodoT} from '../types/Todo'

type TodoProps = {
    todo:TodoT
    loading:boolean
    error:boolean
}

function Todo(props:TodoProps){
  return (
    <div>
    <p>{props.todo.title}</p>
    <p>{props.todo.userId}</p>
    </div>
  )
}

export default Todo