import { HintProps, QuestionsActionTypes, ANSWER_QUESTION, CLEAR_QUESTIONS, DISABLE_HINT } from './types';

export const answerQuestions = (payload: number): QuestionsActionTypes => ({
    type: ANSWER_QUESTION,
    payload,
});

export const clearQuestions = (): QuestionsActionTypes => ({
    type: CLEAR_QUESTIONS,
});

export const disableHint = (payload: HintProps): QuestionsActionTypes => ({
    type: DISABLE_HINT,
    payload,
});