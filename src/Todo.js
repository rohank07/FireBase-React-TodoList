import React, {useState} from 'react'
import {List, Modal, ListItem, ListItemText ,ListItemAvatar, Button, TextField } from "@material-ui/core";
import './Todo.css'
import db from "./firebase"
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';


function Todo(props) {

    const [open, setOpen] = useState(false) // hook
    
    const [updateInput, setUpdate] = useState('')

    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
      
    const classes = useStyles();
//change
    const updateTodo = ()=>{
        console.log("pressed");
        //update todo with new input text
        setOpen(false)
        db.collection('todos').doc(props.todo.id).set({
            todo: updateInput

        },{merge:true}); // does not overwrite the exising id

    }
    return (
        <>        
        <Modal
        open={open} //state
        onClose={e => setOpen(false)} //function what happens when you close modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
            <div className ={classes.paper}>
                <h1>Modal</h1>
                <TextField placeholder={props.todo.todo} onChange = {event => setUpdate(event.target.value)} value = {updateInput} id="standard-secondary" label="Enter Text" color="secondary" />
                <Button onClick = {updateTodo}>Update Todo</Button>
            </div>
        </Modal>

        <List >
            <ListItem className= "todo_list">
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText alignItems ="center" primary = {props.todo.todo} secondary= "⏰" />
                <button onClick= {e =>setOpen(true)}> ✏ Edit Me!</button>
                <DeleteIcon  onClick = {e => db.collection('todos').doc(props.todo.id).delete()}/>
            </ListItem> 
        </List>

        </>
    )
}

export default Todo
