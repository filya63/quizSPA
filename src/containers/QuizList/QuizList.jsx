import React from 'react';
import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom';

const QuizList = () => {
    return (
        <div className={classes.QuizList}>
            <h1>Список тестов</h1>
            <ul>
                { [1, 2, 3].map((quiz, index) => {
                    return (
                        <li key={index}>
                            <NavLink to={'/quiz/' + quiz}>Тест #{quiz}</NavLink>
                        </li>
                    )
                }) }
            </ul>
        </div>
    )
}

export default QuizList;