import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';
import Container from '@material-ui/core/Container'

const initialTodos = [
  {text: 'task 2', isComplete: false, isCached: false, id: 123},
  {text: 'task 1', isComplete: true, isCached: false, id: 456}
]

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  // toggleTodo切換isComplete
  const toggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo:Todo) => {
      if(todo.text === selectedTodo.text) {
        return {
          ...todo,
          isComplete: !todo.isComplete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const addTodo: AddTodo = (text: string) => {
    const timestamp: number = Math.floor(Date.now());
    const newTodo = {text, isComplete: false, isCached: false, id: timestamp};
    setTodos([...todos, newTodo]);
    console.log(todos);
  }

  const editTodo: EditTodo = (todo: Todo) => {
    todos.forEach((item:Todo) => item.isCached = false);
    setTodos([...todos]);
    const cacheTodo: Todo = todos.filter((item:Todo) => todo.text === item.text)[0];
    cacheTodo.isCached = true;
  };

  const setEditText: SetEditText = (todo:Todo ,text:string) => {
    // 修改目標todo內容
    todos.forEach((item: Todo)=>{
      if(item.id === todo.id){
        todo.text = text;
        todo.isCached = false;
      }
    });
    setTodos([...todos]);
  };

  const cancelEdit: CancelEdit = () => {
    todos.forEach(item => item.isCached = false);
    setTodos([...todos]);
  }

  const deleteTodo: DeleteTodo = (todo: Todo) => {
    const key:string = todo.text;
    const spliceIndex:number = todos.findIndex((item:Todo) => item.text === key);
    todos.splice(spliceIndex, 1);
    setTodos([...todos]);
  }

  return(
    <Container maxWidth="md">
      <h1>What is the Plan for Today ?</h1>
     <TodoList todos={todos} editTodo={editTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} setEditText={setEditText} cancelEdit={cancelEdit}/>
     <AddTodoForm addTodo={addTodo} />
    </Container>
  )
}

export default App;