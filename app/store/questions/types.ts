export const ANSWER_QUESTION = 'questions/answerQuestion';
export const CLEAR_QUESTIONS = 'questions/clearQuestions';
export const DISABLE_HINT = 'questions/disableHint';

export type HintProps = 'half' | 'call' | 'hall';

export type Question = {
    question: string;
    variants: {
        text: string;
        right?: boolean;
    }[];
}

export type QuestionsState = {
    questions: Question[];
    answered: number;
    score: number;
    index: number;
    hints: {
        half: boolean,
        call: boolean,
        hall: boolean,
    };
}

interface AnswerQuestionAction {
    type: typeof ANSWER_QUESTION;
    payload: number;
}

interface ClearQuestionsAction {
    type: typeof CLEAR_QUESTIONS;
}

interface DisableHintAction {
    type: typeof DISABLE_HINT;
    payload: HintProps;
}

export type QuestionsActionTypes = AnswerQuestionAction | ClearQuestionsAction | DisableHintAction;