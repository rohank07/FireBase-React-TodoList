import "./App.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel} from "@material-ui/core";
import db from "./firebase";
import firebase from 'firebase';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function App() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");

  //when the app loads, listen to db and fetch new todos

useEffect (()=>{
  //this code here loads when app.js loads
  db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    //docs is each task I have added
    //doc.data() return object
    setTodos(snapshot.docs.map(doc => ({id: doc.id ,todo: doc.data().todo})))
  })
}, []) //no dependency here since we want to run the useeffect only on load

  
  const addToDo = (event) => {
    event.preventDefault();
    db.collection('todos').add({ // adding a value to the db (name of the collection) A snapshot is fired
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    //setTodos([...todos, input]);
    setInput(""); // clear the input when submitting

  };

  return (
    <div className="App">
      <h1>Todo List</h1>
<form>
      <FormControl>
        <InputLabel>Write a Todo ✅</InputLabel>
        <Input value={input} onChange={(event) => setInput(event.target.value)}/>
      </FormControl>
      <Button
        disabled={!input}
        size ="Medium"
        variant="contained"
        color="primary"
        type="submit"
        startIcon ={<AddCircleIcon/>}
        onClick={addToDo}>
        Add Todo
      </Button>
</form>
      <ul>
        {todos.map(todo => (
         <Todo todo = {todo}/>

         ))}
      </ul>

      
    </div>
  );
}

export default App;
