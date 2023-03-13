import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import { TodoT } from './types/Todo';
import Todos from './components/Todos';
import Todo from './components/Todo';


function App() {
const [todos, setTodos] = useState<TodoT[]>([])
const [loading, setLoading] = useState<boolean>(false)
const [error, setError] = useState<boolean>(false)

const addTodo = (newTodo:TodoT)=>{
  let newTodos = [...todos, newTodo]
  setTodos(newTodos)
}

const url='https://jsonplaceholder.typicode.com/todos'

useEffect(()=>{
const fetch = async()=>{
  let response = await axios.get(url)
  let data:TodoT[] = await response.data
  setTodos(data)
}
fetch()
}, [])

  return (
    <div>
      <h1>Todos</h1>
      <Todos 
      loading={loading}
      addTodo = {addTodo}
      setLoading={setLoading}
      todos = {todos}
      error={error}
      />
    </div>
  );
}

export default App;
