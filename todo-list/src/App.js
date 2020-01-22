import React, {useState, useReducer} from 'react';
import Todo from './components/Todo.js'

const initialState =  {
  todos: [
    {
      item: 'Learn Reducers',
      completed: false,
      id:1234
    }
  ]
}

const todoReducer = (state, action) => {
  switch(action.type){
    case "ADD_TODO":
      console.log('this is state', state)
      return{
        todos: [
          ...state.todos,
            {
              item: action.payload,
              completed:false,
              id: Date.now()
            }
        ]
      }
    case "COMPLETED_TODO":
      return {
        todos:
          state.todos.map(item => {
            if (item.id === action.payload) {
              console.log(item, action)
              return{
                ...item,
                completed: !item.completed
              }
              // console.log(!item.completed)
            }
            else{
              return item
            }
          })
      }
    case "DELETE":
      return {
        todos: state.todos.filter(e => e.completed ? '' : e)
      }
    default: 
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  // const [todo, setTodo] = useState([])
  const [todoText, newTodoText] = useState('')
  
  const handleToggle = id => {
    dispatch({ type: 'COMPLETED_TODO', payload: id})
  }

  const handleChanges = e => {
    newTodoText(e.target.value)
  }


  
  return (
    <div className="App">
      <input 
      className='todoText'
      type= 'text'
      name= 'newTodoText'
      value={todoText}
      onChange={handleChanges}
      placeholder='Add an item todo here'
      />
      <button
        onClick= {e => {
          dispatch({
            type:"ADD_TODO",
            payload: todoText
          })
          
        }}
        >
          Add Todo
        </button>
        {
          console.log(state.todos),
          state.todos.map(item => (
            <Todo 
              toggleHandler={handleToggle}
              item={item}
              key={item.id} 
            />
          ))
        }
        <button
          onClick={() => {
            dispatch({ type: 'DELETE'})
          }}
          >
            Delete
          </button>
    </div>
  );
}

export default App;
