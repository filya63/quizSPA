import React, {useState, Fragment} from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/ui/button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { formControl, validateControl, validateForm } from '../../form/formControl';

const createOptionForm = number => { // Оптимизация, чтобы каждый option не прописывать
    return formControl({
        label: `Ответ №${number}`,
        errorMessage: 'Введите значение'
    }, {required: true})
}

const QuizCreator = () => {
    const [state, setState] = useState({
        quiz: [], // сюда будут записываться варианты ответов
        rigthAnswerId: 1,
        isFormValid: false,
        options: [
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4}
        ],
        formControl: {
            question: formControl({
                label: 'Введите вопрос',
                errorMessage: 'Поле не может быть пустым. Введите вопрос!'
            }, {required: true}),
            option1: createOptionForm(1),
            option2: createOptionForm(2),
            option3: createOptionForm(3),
            option4: createOptionForm(4)
        }
    });
    const submitForm = event => {
        event.preventDefault();
    }
    const addQuestionHandler = () => {
        console.log('Добавили вопрос', state)
        const quiz = state.quiz.concat(); // скопируем массив в переменную quiz,
        // чтобы избежать мутабельности. Это один из вариантов, как можно сделать
        const index = state.quiz.length + 1;

        const {question, option1, option2, option3, option4} = state.formControl;

        const questionItem = {
            question: question.value,
            id: index,
            rigthAnswerId: state.rigthAnswerId,
            answers: [
                {id: option1.id, text: option1.value},
                {id: option2.id, text: option2.value},
                {id: option3.id, text: option3.value},
                {id: option4.id, text: option4.value},
            ]
        }
        quiz.push(questionItem);

        setState(prev => {
            return {
                ...prev,
                quiz,
                rigthAnswerId: 1,
                isFormValid: false,
                formControl: {
                    question: formControl({
                        label: 'Введите вопрос',
                        errorMessage: 'Поле не может быть пустым. Введите вопрос!'
                    }, {required: true}),
                    option1: createOptionForm(1),
                    option2: createOptionForm(2),
                    option3: createOptionForm(3),
                    option4: createOptionForm(4)
                }
            }
        })
    }
    const createTestHandler = event => {
        event.preventDefault();
        console.log(state.quiz)
    }
    const onChangeHandler = (value, controlName) => {
        const formControls = { ...state.formControl }; // делаем копию state
        const control = {...formControls[controlName]}; 

        control.value = value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation);
        
        formControls[controlName] = control;
        setState(prev => {
            return {
                ...prev,
                formControl: formControls,
                isFormValid: validateForm(formControls)
            }
        })
    }
    const renderInputs = () => {
        return Object.keys(state.formControl).map((controlName, index) => {
            const control = state.formControl[controlName];
            return (
                <Fragment key={controlName + index}>
                    <Input 
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={event => onChangeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr/> : null }
                </Fragment>
            )
        })
    }
    const selectChangeHandler = event => {
        setState({
            ...state,
            rigthAnswerId: +event.target.value
        })
    }
    return (
        <div className={classes.QuizCreator}>
            <h1>Создание теста</h1>
            <form onSubmit={submitForm}>
                { renderInputs() }
                <Select
                    label='Выберите правильный ответ'
                    onChange={selectChangeHandler}
                    value={state.rigthAnswerId}
                    options={state.options}
                />
                <Button type="primary" onClick={addQuestionHandler} disabled={state.isFormValid ? false : true}>Добавить вопрос</Button>
                <Button type="success" onClick={createTestHandler} disabled={state.quiz.length ? false : true}>Создать тест</Button>
            </form>
        </div>
    )
}

export default QuizCreator;