import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components/native';

import { RootState } from '../store/rootReducer';
import QuestionElement from '../components/QuestionElement';

const mapStateToProps = ({ questions }: RootState) => ({ questions });

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Container = styled.View`
    display: flex;
    flex-direction: column;
`;

const QuestionsList: React.FC<PropsFromRedux> = ({ questions }) => {
    const sortedVariants = questions.questions[questions.index].variants.sort(() => Math.random() - 0.5);

    return (
        <Container>
            {sortedVariants.map((variant, index) => (
                <QuestionElement key={index} index={index} {...variant} />
            ))}
        </Container>
    );
};

export default connector(QuestionsList);
