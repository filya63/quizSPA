import React from 'react';
import classes from './AnswerItem.module.css';

const AnswerItem = (props) => {
    const cls = [classes.answer];
    if(props.colorState) {
        cls.push(classes[props.colorState])
    }
    return (
        <li onClick={props.onAnswerClick} className={cls.join(' ')}>
            {props.answer}
        </li>
    )
}

export default AnswerItem;