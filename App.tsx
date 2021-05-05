import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';
import styled from 'styled-components/native';
import store from './app/store/store';

import HomeScreen from './app/screens/HomeScreen';
import QuestionScreen from './app/screens/QuestionScreen';
import LostScreen from './app/screens/LostScreen';
import WinScreen from './app/screens/WinScreen';

const Container = styled.SafeAreaView`
    position: relative;
    flex: 1;
    background-color: #211F25;
`;

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <NativeRouter>
                <Container>
                    <Route exact path="/" component={HomeScreen} />
                    <Route path="/questions" component={QuestionScreen} />
                    <Route path="/lost" component={LostScreen} />
                    <Route path="/win" component={WinScreen} />
                    <StatusBar style="auto" />
                </Container>
            </NativeRouter>
        </Provider>
    );
}

export default App;