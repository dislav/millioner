import React from 'react';
import { useHistory } from 'react-router-native';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

import { RootState } from '../store/rootReducer';
import { answerQuestions } from '../store/questions/actions';

const mapStateToProps = ({ questions }: RootState) => ({ questions });

const mapDispatchToProps = {
    answerQuestions,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Container = styled.TouchableOpacity`
    margin-bottom: 10px;
`;

const QuestionContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 16px 30px;
`;

const QuestionCircle = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 100px;
    margin-right: 20px;
`;

const QuestionCircleText = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
`;

const QuestionText = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
`;

type IQuestionElement = PropsFromRedux & {
    text: string;
    index: number;
    right?: boolean;
};

const letterByIndex: {
    [key: number]: string;
} = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
};

const QuestionElement: React.FC<IQuestionElement> = ({ text, right, index, answerQuestions, questions }) => {
    const history = useHistory();
    
    const handleClick = () => {
        console.log(questions.answered + 1);
        if (right) {
            if (questions.answered + 1 === 15) {
                history.push('/win');
            } else {
                answerQuestions(index);
            }
        } else {
            history.push('/lost');
        }
    };

    return (
        <Container onPress={handleClick}>
            <LinearGradient start={{ x: 0, y: 0 }} colors={['#414DB7', '#3D2375']}>
                <QuestionContainer>
                    <QuestionCircle>
                        <QuestionCircleText>{letterByIndex[index]}</QuestionCircleText>
                    </QuestionCircle>
                    <QuestionText>{text}</QuestionText>
                </QuestionContainer>
            </LinearGradient>
        </Container>
    );
};

export default connector(QuestionElement);
