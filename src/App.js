import React from 'react';
import './App.css';
import Templates from './hoc/Templates';
import { Route, Switch } from 'react-router-dom';
import Quiz from './containers/quiz';
import Auth from './containers/Auth';
import QuizCreator from './containers/QuizCreator';
import QuizList from './containers/QuizList';

function App() {
  return (
    <Templates>
      <Switch>
        <Route path="/" exact component={QuizList}/>
        <Route path="/quiz-create" component={QuizCreator}/>
        <Route path="/quiz/:id" component={Quiz}/> {/* динамический роутер */}
        <Route path="/auth" component={Auth}/>
      </Switch>
    </Templates>
  );
}

export default App;