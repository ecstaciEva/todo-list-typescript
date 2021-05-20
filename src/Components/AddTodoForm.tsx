import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input'

type Props = {
    addTodo: AddTodo;
};

export const AddTodoForm:React.FC<Props> = ({addTodo}:Props) => {
    const [text, setText] = useState("");
    const formStyle: Style = {
        display:'flex',
    }

    return (
        <FormControl style={formStyle}>
            <InputLabel htmlFor="todo-input">輸入待辦事項</InputLabel>
            <Input style={{border: '0', marginBottom: '10px'}} type="text" id="todo-input" value={text} onChange={e=>{
                setText(e.target.value);
            }} />
            <Button variant="outlined" color="primary" type="submit" onClick={e=>{
                e.preventDefault();
                if(text.trim() !== "") {
                    addTodo(text);
                    setText("");
                }
            }}>
                Add
            </Button>
        </FormControl>
    )
}