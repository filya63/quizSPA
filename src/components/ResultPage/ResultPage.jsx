import React from 'react';
import classes from './ResultPage.module.css';

const ResultPage = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success') { // проверяем значение с 'success'
            total++;
        }
        return total;
    }, 0) // превращаем объект в массив ключей
    return (
        <div className={classes.finishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    debugger;
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error'
                            ? 'fa-times'
                            : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ];
                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>. &nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <p>Правильно {successCount} из {props.quiz.length}</p>
            <button onClick={props.onClearQuiz}>Повторить</button>
        </div>
    )
}

export default ResultPage;