import React from 'react';
import AnswerItem from './answerItem';
import classes from './AnswersList.module.css';

const AnswersList = (props) => {
    return (
        <ul className={classes.answersList}>
            {props.answers.map((answer, index) => {
                return (
                    <AnswerItem
                        key={index}
                        answer={answer}
                        onAnswerClick={() => props.onAnswerClick(index)}
                        colorState={props.colorState ? props.colorState[index] : null}
                    />
                )
            })}
        </ul>
    )
}

export default AnswersList;