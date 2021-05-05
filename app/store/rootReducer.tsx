import { combineReducers } from 'redux';
import { questionsReducer } from './questions/reducer';

const reducers = combineReducers({
    questions: questionsReducer,
});

export type RootState = ReturnType<typeof reducers>;
export default reducers;