import React from 'react';
import QuestionCard from './components/QuestionCard'


const App = () => {
  
  const startTrivia = async () => {
   

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {


  }

  const nextQuestion = () => {


  }

  
  return ( 
    <div className="App">
      <h1>Hmk's Quiz</h1>
      <button className="start" onClick={startTrivia}>
        START
      </button>
      <p className="score">Score:</p>
      <p>Loading  Quetions...</p>
      <QuestionCard />
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
      
    </div>
  );
}

export default App;
