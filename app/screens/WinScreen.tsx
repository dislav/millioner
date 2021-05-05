import React from 'react';
import { useHistory } from 'react-router-native';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

import { RootState } from '../store/rootReducer';
import { clearQuestions } from '../store/questions/actions';

const mapStateToProps = ({ questions }: RootState) => ({ questions });

const mapDispatchToProps = {
  clearQuestions,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Container = styled.View`
  flex: 1 1 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Image = styled.Image`
  width: 250px;
  height: 250px;
  margin-bottom: 60px;
`;

const Text = styled.Text`
  text-align: center;
  color: white;
  font-size: 18px;
  margin-bottom: 60px;
  padding: 0 30px;
`;

const ButtonContainer = styled.TouchableOpacity``;

const ButtonText = styled.Text`
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  padding: 16px 60px;
`;

const WinScreen: React.FC<PropsFromRedux> = ({ questions, clearQuestions }) => {
  const history = useHistory();

  const handleClick = () => {
    clearQuestions();
    history.push('/questions');
  };

  return (
    <Container>
      <Image source={require('../../assets/preview.png')} />
      <Text>
        Поздравляем, вы выиграли {questions.score}₽! К сожалению, данные деньги нельзя вывести, но
        вы держитесь... Использовано подсказок:{' '}
        {Object.keys(questions.hints).reduce(
          (str, key) => (str += questions.hints[key] ? 1 : 0),
          0
        )}.
      </Text>
      <ButtonContainer onPress={handleClick}>
        <LinearGradient start={{ x: 0, y: 0 }} colors={['#414DB7', '#3D2375']}>
          <ButtonText>Новая игра</ButtonText>
        </LinearGradient>
      </ButtonContainer>
    </Container>
  );
};

export default connector(WinScreen);
