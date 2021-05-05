import { QuestionsState, ANSWER_QUESTION, CLEAR_QUESTIONS, DISABLE_HINT, QuestionsActionTypes } from './types';
import _questions from '../../../data/questions.json';

const initialState: QuestionsState = {
    questions: _questions,
    answered: 0,
    score: 0,
    index: Math.floor(Math.random() * _questions.length),
    hints: {
        half: false,
        call: false,
        hall: false,
    },
}

export const questionsReducer = (state = initialState, action: QuestionsActionTypes): QuestionsState => {
    switch (action.type) {
        case ANSWER_QUESTION:
            const questions = state.questions.filter((_, index) => index !== state.index);

            return {
                ...state,
                questions,
                answered: state.answered + 1,
                score: state.score + ((state.answered + 1) * 15000),
                index: Math.floor(Math.random() * questions.length),
            };
        case CLEAR_QUESTIONS:
            return {
                ...initialState,
                index: Math.floor(Math.random() * _questions.length),
            };
        case DISABLE_HINT:
            return {
                ...state,
                hints: {
                    ...state.hints,
                    [action.payload]: true,
                },
            };
        default:
            return state;
    }
}