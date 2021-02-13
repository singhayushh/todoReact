import React, {Fragment, useState} from 'react'
import './App.css';
import {ReactComponent as Todosvg} from './clock-solid.svg';
import {ReactComponent as Donesvg} from './clipboard-check-solid.svg';

type FormEle = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: String
  complete: boolean
}

function App() {
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e: FormEle):void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text:string):void => {
    if (text == "") return;
    const newTodos: ITodo[] = [...todos, {text, complete: false}]
    setTodos(newTodos)
  }

  const completeTodo = (index:number):void => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const removeTodo = (index:number):void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const getColor = (a:string):string => {
      if (a == 'todo')  return '#FE7443';
      return '#8676FD';
  }

  return (
    <Fragment>
      <div className="credits">
        Icons used from <a href="https://fontawesome.com/license" target="_blank">FontAwesome</a>
      </div>
      <div className="App">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Add new todo" value={value} onChange={e => setValue(e.target.value)}/>
          <button type="submit" hidden></button>
        </form>
        <section>
          <h2>Working</h2>
          {todos.map((todo: ITodo, index: number) => (
            !todo.complete?
              <Fragment key={index}>
                <div className="todo" style={{backgroundColor: getColor('todo')}}>
                  <Todosvg/>
                  <div className="text">{todo.text}</div>
                  <div className="buttons">
                    <button type="button" onClick={() => completeTodo(index)}>Mark as done</button>
                    <button type="button" onClick={() => removeTodo(index)}>Delete</button>
                  </div>
                </div>
              </Fragment>
            :''
          ))}
          <div className="spacer"></div>
          <h2>Done</h2>
          {todos.map((todo: ITodo, index: number) => (
            todo.complete?
              <Fragment key={index}>
                <div className="todo" style={{backgroundColor: getColor('done')}}>
                  <Donesvg/>
                  <div className="text">{todo.text}</div>
                  <div className="buttons">
                    <button type="button" onClick={() => completeTodo(index)}>Mark as undone</button>
                    <button type="button" onClick={() => removeTodo(index)}>Delete</button>
                  </div>
                </div>
              </Fragment>
            :''
          ))}
        </section>
      </div>
    </Fragment>
  );
}

export default App;
