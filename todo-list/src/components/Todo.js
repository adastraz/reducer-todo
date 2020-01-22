import React from 'react'

const Todo = props => {
    return (
        <>
            <li onClick={() => props.toggleHandler(props.item.id)}
            className={props.item.completed ? 'completed' : ''}
            >{props.item.item}</li>
        </>
    )
}
export default Todo