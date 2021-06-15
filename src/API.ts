import React from 'react';
import {shuffleArray} from './util'

export type Question = { // fetch로 받아오는 데이터 타입과 똑같이 만들어준다
    category: string;
    correct_answer: string;
    diffyculty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[] };


export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD ="hard",

}

export const fetchQuizQuestions = async (amount: number, difficulty:Difficulty) => {

    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endPoint)).json()//먼저 데이터가 올때까지 기다리고 다음변환 할때까지 기다리고 json형태로 변환
    console.log(data);
    return data.results.map((question: Question) => ({
        ...question,
        // 오답과 정답을 섞어준다?
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer]), 
    }))
}

