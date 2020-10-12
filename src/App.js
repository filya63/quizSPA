import React from 'react';
import './App.css';
import Templates from './hoc/Templates';
import Quiz from './containers/quiz';

function App() {
  return (
    <Templates>
      <Quiz />
    </Templates>
  );
}

export default App;
