import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

import { RootState } from '../store/rootReducer';

const mapStateToProps = ({ questions }: RootState) => ({ questions });

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ContainerGradient = styled(LinearGradient)`
    margin-bottom: 40px;
`;

const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 40px 30px;
`;

const QuestionCircle = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 100px;
    margin-bottom: 20px;
`;

const QuestionCircleText = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
`;

const QuestionText = styled.Text`
    text-align: center;
    color: white;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
`;

const QuestionContainer: React.FC<PropsFromRedux> = ({ questions }) => {
    return (
        <ContainerGradient start={{x: 0, y: 0}} colors={['#5D45A1', '#542273']}>
            <Container>
                <QuestionCircle>
                    <QuestionCircleText>?</QuestionCircleText>
                </QuestionCircle>
                <QuestionText>{questions.questions[questions.index].question}</QuestionText>
            </Container>
        </ContainerGradient>
    )
}

export default connector(QuestionContainer);
