import React, {useState} from 'react';
import classes from './Auth.module.css';
import Button from '../../components/ui/button';
import Input from '../../components/ui/Input';
import is from 'is_js';

const Auth = () => {
    const [state, setState] = useState({
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    });
    const validateControl = (value, validation) => {
        if(!validation) {
            return true;
        }
        let isValid = true;

        if(validation.required) {
            isValid = value.trim() !== '' && isValid; // если значение value не равен пустоте - тогда возвращаем true; && isValid - и если другие не false
        }
        if(validation.email) {
            isValid = is.email(value) && isValid;
        }
        if(validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid;
    }
    const onChangeHandler = (event, controlName) => {
        console.log(event.target.value, controlName);

        const formControls = { ...state.formControls }; // делаем копию state
        const control = {...formControls[controlName]}; // записываем в контрол объект email или password,
        // чтобы с ним работать, а далее засетать в настоящий state
        control.value = event.target.value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation);
        
        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid; // если у каждого объекта свойство valid true и isFormValid
            // был равен true - то значение всегда будет true
        })
        
        formControls[controlName] = control; // записываем в объект с ключом controlName(email или password) измененные данные
        setState({formControls, isFormValid}) // сетаем измененный объект
    }
    const renderInputs = () => {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName];
            console.log(control);
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={event => onChangeHandler(event, controlName)}
                />
            )
        })
    }
    const submitHandler = event => {
        event.preventDefault();
    }
    return(
        <div className={classes.Auth}>
            <h1>Авторизация</h1>
            <form onSubmit={submitHandler} className={classes.AuthForm}>
                { renderInputs() }

                <Button type="success" disabled={state.isFormValid ? false : true}>Войти</Button>
                <Button type="primary" disabled={state.isFormValid ? false : true}>Зарегистрироваться</Button>
            </form>
        </div>
    )
}

export default Auth;