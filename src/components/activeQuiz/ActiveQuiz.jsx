import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from '../AnswersList';

const ActiveQuiz = (props) => {
    return (
        <div className={classes.activeQuiz}>
            <div className={classes.currentQuestion}>
                <span>
                    {props.currentAnswer}. {props.question}
                </span>
                <small>
                    {props.currentAnswer} из {props.length}
                </small>
            </div>
            <AnswersList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                colorState={props.colorState}
            />
        </div>
    )
}

export default ActiveQuiz;