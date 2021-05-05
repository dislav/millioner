import React from 'react';
import { useHistory } from 'react-router-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

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

const ButtonContainer = styled.TouchableOpacity``;

const ButtonText = styled.Text`
    color: white;
    font-weight: 500;
    text-transform: uppercase;
    padding: 16px 60px;
`;

const HomeScreen: React.FC = () => {
    const history = useHistory();

    return (
        <Container>
            <Image source={require('../../assets/preview.png')} />
            <ButtonContainer onPress={() => history.push('/questions')}>
                <LinearGradient start={{ x: 0, y: 0 }} colors={['#414DB7', '#3D2375']}>
                    <ButtonText>Начать игру</ButtonText>
                </LinearGradient>
            </ButtonContainer>
        </Container>
    );
};

export default HomeScreen;
