import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components/native';

import { RootState } from '../store/rootReducer';

const mapStateToProps = ({ questions }: RootState) => ({ questions });

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Container = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0 30px;
    margin: 20px 0 40px;
`;

const Text = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 600;
`;

const Header: React.FC<PropsFromRedux> = ({ questions }) => {
    return (
        <Container>
            <Text>Счет: {questions.score} ₽</Text>
            <Text>Вопрос {questions.answered + 1} из 15</Text>
        </Container>
    );
};

export default connector(Header);
