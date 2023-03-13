import React from 'react'
import {TodoT} from '../types/Todo' 
import Todo from './Todo'

interface TodosProps{
    todos:TodoT[]
     loading:boolean
     error:boolean
      addTodo : (newTodo:TodoT)=>void
      setLoading:React.Dispatch<React.SetStateAction<boolean>>
      }

function Todos({todos, loading, error, setLoading, addTodo}: TodosProps){
return(
    <div>
    Todos
    <div>
    {todos.map((todo)=>(
    <Todo key={todo.id} error={error} todo={todo} loading={loading} />
    ))}
    </div>
    </div>
)
    }

export default Todos