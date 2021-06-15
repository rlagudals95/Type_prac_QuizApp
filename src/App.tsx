import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
//components
import { fetchQuizQuestions } from "./API"
//type
import {QuestionState, Difficulty } from "./API" //함수 인자로 넘겨줄 ENUM 타입도 가져와야한다
// 글로벌 스타일 적용
import { GlobalStyle , Wrapper} from './App.style';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([]) //state타입을 명시해준다
  const [number, setNumber] = useState(0) //질문 순서
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  console.log(questions);

  
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )
      // 비동기 처리후
      // 새질문을 state로 저장
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user answer
      const answer = e.currentTarget.value;
      // 답 체크
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1)// 점수 +1
      // 답변을 유저 답변에 저장
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject])//스프레드와 prev는 왜쓰는 걸까?
    }
  };

  const nextQuestion = () => {
    // 다음 질문으로 넘기기 마지막 질문이 아니라면!
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }

  }

  
  return (
    <>
      <GlobalStyle/>
    <Wrapper>
      <h1>Hmk's Quiz</h1>
      { gameOver || userAnswers.length === TOTAL_QUESTIONS ?  <button className="start" onClick={startTrivia}>
        START
      </button> : null}

      {!gameOver ? <p className="score">Score:{score}</p>: null}
      {loading && <p>Loading  Quetions...</p>}
      
      {!loading && !gameOver&& <QuestionCard
        questionNr={number + 1} // 질문은 1부터 시작
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback ={checkAnswer}
      />}
    
      {!gameOver && !loading && userAnswers.length === number +1 && number !== TOTAL_QUESTIONS - 1? ( <button className="next" onClick={nextQuestion}>
        Next Question
      </button>) : null}
      </Wrapper>
      </>
  );
}

export default App;
