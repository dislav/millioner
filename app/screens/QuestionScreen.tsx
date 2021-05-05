import React from 'react';
import styled from 'styled-components/native';

import Header from '../components/Header';
import QuestionContainer from '../components/QuestionContainer';
import QuestionsList from '../components/QuestionsList';
import Hints from '../components/Hints';

const Container = styled.View``;

const QuestionScreen: React.FC = () => {
    return (
        <Container>
            <Header />
            <QuestionContainer />
            <QuestionsList />
            <Hints />
        </Container>
    );
};

export default QuestionScreen;
