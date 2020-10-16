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
        console.log('Форма отправлена')
    }
    const addQuestionHandler = () => {
        console.log('Добавили вопрос')
    }
    const createTestHandler = () => {
        console.log('Создали тест')
    }
    const onChangeHandler = (value, controlName) => {
        const formControls = { ...state.formControls };
        const control = {...formControls[controlName]};

        control.value = value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation);

        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        })
        
        formControls[controlName] = control;
        console.log(formControls)
        setState({
            formControls,
            isFormValid: validateForm(formControls)
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
    console.log(state);
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
                <Button onClick={addQuestionHandler} type="primary">Добавить вопрос</Button>
                <Button onClick={createTestHandler} type="success">Создать тест</Button>
            </form>
        </div>
    )
}

export default QuizCreator;