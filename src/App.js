import React, {useState, useRef} from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4'
function App() {
    const [todos, setTodos] = useState([{id: 1, name: 'Todo 1', complete: true}])
    const todoNameRef = useRef()
    function handleAddTodo(e){
        const name = todoNameRef.current.value
        if(name == '') return
        setTodos(prevTodos => {
            return [...prevTodos,
            {
                id: uuidv4(), name: name, complete: false
            }]
        })
        todoNameRef.current.value = null
    }
    return(
        <>
        <TodoList todos = {todos} />
        <input type = "text" />
        <button>Add Todo</button>
        <button>Clear Completed</button>
        <div>0 left to do.</div>
        </>
    );
}

export default App;