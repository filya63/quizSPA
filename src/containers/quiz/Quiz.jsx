import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/activeQuiz";
import ResultPage from './../../components/ResultPage';

export default class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    colorState: null,
    activeQuestion: 0,
    quiz: [
      {
        id: 1,
        rigthAnswerId: 0,
        question: "Что такое HTML?",
        answers: [
          "Язык гипертекстовой разметки",
          "Язык программирования",
          "Препроцессор",
          "Фреймворк",
        ],
      },
      {
        id: 2,
        rigthAnswerId: 1,
        question: "Какой язык программирования без скобок, запятых?",
        answers: ["JavaScript", "Python", "Perl", "PHP"],
      },
    ],
  };
  onAnswerClick = (index) => {
    console.log("Answer id: ", index);
    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;
    if (index === this.state.quiz[this.state.activeQuestion].rigthAnswerId) { // если index кликнутой кнопки совпадает с индексом правильного ответа
      if(!results[question.id]) { // Если в текущем результате ничего не записано
        results[question.id] = 'success';
        console.log(results);
      }
      this.setState({
        colorState: { [index]: "succses" },
        results
      });
      console.log(this.state)
      const timeout = window.setInterval(() => {
        if (!(this.state.quiz.length - 1 === index)) {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            colorState: null,
          });
        } else {
            this.setState({
                isFinished: true
            })
        }
        clearInterval(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      console.log(results);
      this.setState({
        colorState: { [index]: "error" },
        results
      });
      console.log(this.state)
    }
  };

  onClearQuiz = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      colorState: null
    });
  }
  render() {
    return (
      <div className={classes.quiz}>
        <div className={classes.quizWrapper}>
          <h1>Quiz</h1>
          {this.state.isFinished ? (
            <ResultPage
              results={this.state.results}
              quiz={this.state.quiz}
              onClearQuiz={this.onClearQuiz}/>
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClick}
              length={this.state.quiz.length}
              currentAnswer={this.state.activeQuestion + 1}
              colorState={this.state.colorState}
            />
          )}
        </div>
      </div>
    );
  }
}
