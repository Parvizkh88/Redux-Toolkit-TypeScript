import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { TodosState, TodoT } from '../../types/TodoTypes'

const baseURL = 'https://jsonplaceholder.typicode.com/todos'

const initialState :TodosState = {
    todos: [],
    isLoading: false,
    isError: false,
    message: '',
}


// Add ------------------
export const getAllTodos = createAsyncThunk(
    'todos/getAllTodos', async (_, thunkAPI) => {
        console.log(thunkAPI.getState());
        const response = await axios.get(baseURL)
        // console.log(response);
        const data:TodoT[] = await response.data
        return data
    })
// Delete ------------------
export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo', async (id:number) => {
        // console.log(thunkAPI.getState());
        const response = await axios.delete(`${baseURL}/${id}`)
        // console.log(response);
        const data = await response.data
        // console.log(data);
        return id 
    })
// Update ------------------

export const updateTodo = createAsyncThunk(
    'todos/updateTodo', async (update:TodoT) => {
        console.log(update);
               const response = await axios.put(`${baseURL}/${update.newTodo.id}`, update.newTodo)
               const data:TodoT = await response.data
        return data
    })

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        search: (state, action: PayloadAction<string>) => { 
            let search = action.payload
            state.todos = state.todos.filter((todo)=> 
            todo.title.toLowerCase().includes(search.toLowerCase()))
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTodos.fulfilled, (state, action) => {
            state.todos = action.payload
            state.isLoading = false
            state.message = 'Fetch successful'
        })
        builder.addCase(getAllTodos.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllTodos.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = 'Fetch failed'
            state.todos = []
        })
        // delete todo
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            let id = action.payload
            // console.log('payload : ' + id);
            state.todos = state.todos.filter((todo) => todo.id !== id)
            state.isLoading = false
            state.message = 'Delete successful'
        })
        builder.addCase(deleteTodo.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = 'Delete failed'
        })
        // update todo -> fulfilled
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            let updated = action.payload

            state.todos = state.todos.map((todo) => {
                if (todo.id === updated.id) {
                    return updated
                }
                return todo
            })

            state.isLoading = false
            state.message = 'Delete successful'
        })
    },
})

// Action creators are generated for each case reducer function
export const { search } = todosSlice.actions
export const selectTodos = (state:any) => state.todos

export default todosSlice.reducer

