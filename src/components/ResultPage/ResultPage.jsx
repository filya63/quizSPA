import React from 'react';
import classes from './ResultPage.module.css';

const ResultPage = () => {
    return (
        <div className={classes.finishedQuiz}>
            <ul>
                <li>
                    <strong>1. </strong>
                    How Are you?ResultPage
                    <i className={'fa fa-times ' + classes.error} />
                </li>
                <li>
                    <strong>2. </strong>
                    How Are you?ResultPage
                    <i className={'fa fa-check ' + classes.success} />
                </li>
            </ul>
            Finished
        </div>
    )
}

export default ResultPage;