import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components/native';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { RootState } from '../store/rootReducer';
import { disableHint } from '../store/questions/actions';
import { HintProps } from '../store/questions/types';

const mapStateToProps = ({ questions }: RootState) => ({ questions });

const mapDispatchToProps = {
  disableHint,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 80px;
  margin-top: 20%;
`;

const Hint = styled.Pressable<{ disabledHint?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${({ disabledHint }) => (disabledHint ? 'rgba(65, 77, 183, .5)' : '#414db7')};
  border-radius: 100px;
`;

const Icon = styled(Svg)`
  width: 80%;
  height: 80%;
  color: black;
`;

const Modal = styled.Modal``;

const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 80%;
  min-height: 200px;
  background-color: #e7ab73;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: auto;
`;

const ModalClose = styled.Pressable`
  position: absolute;
  top: 10px;
  right: 4px;
  width: 40px;
  height: 40px;
  color: black;
`;

const HintText = styled.Text`
  color: black;
  text-align: center;
  font-size: 20px;
`;

const Hints: React.FC<PropsFromRedux> = ({ questions, disableHint }) => {
  const [half, setHalf] = useState(false);
  const [call, setCall] = useState(false);
  const [hall, setHall] = useState(false);

  const onClickHalf = () => {
    if (questions.hints.half) return;
    setHalf(true);
    disableHint('half');
  };

  const variantPercent = (arr: any[], percent: number, index = 0) => {
    const randPercent = index !== 2 ? +(percent / 2).toFixed() : percent - 1;
    const text = `${arr[index].text}: ${randPercent}%\n`;
    return index < 2 ? `${text}${variantPercent(arr, randPercent, index + 1)}` : text;
  };

  const getHint = (type: HintProps) => {
    const [rightAnswer] = questions.questions[questions.index].variants.filter(
      ({ right }) => right
    );
    const other = questions.questions[questions.index].variants.filter(({ right }) => !right);
    const randomIndex = Math.floor(Math.random() * other.length);
    const failedAnswer = other[randomIndex].text;

    const randomVariant = Math.floor(Math.random() * 2);
    const rightPercent = +(78 - (Math.random() - 0.5) * 10).toFixed();

    switch (type) {
      case 'half':
        return `${randomVariant === 0 ? rightAnswer.text : failedAnswer}\nили\n${
          randomVariant === 1 ? rightAnswer.text : failedAnswer
        }`;
      case 'call':
        return `...скорее всего правильный вариант - "${rightAnswer.text}"`;
      case 'hall':
        return `${rightAnswer.text}: ${rightPercent}%\n${variantPercent(
          other,
          100 - rightPercent
        )}`;
      default:
        return {
          rightAnswer: rightAnswer.text,
          failedAnswer: other[randomIndex].text,
          random: Math.floor(Math.random()),
        };
    }
  };

  const onClickCall = () => {
    if (questions.hints.call) return;
    setCall(true);
    disableHint('call');
  };

  const onClickHall = () => {
    if (questions.hints.hall) return;
    setHall(true);
    disableHint('hall');
  };

  return (
    <Container>
      <Hint onPress={onClickHalf} disabledHint={questions.hints.half}>
        <Icon width="31" height="9" viewBox="0 0 31 9" fill="none">
          <Path
            d="M3.06 3.228C3.868 3.228 4.548 3.472 5.1 3.96C5.652 4.44 5.928 5.112 5.928 5.976C5.928 6.84 5.636 7.516 5.052 8.004C4.476 8.492 3.768 8.736 2.928 8.736C2.248 8.736 1.648 8.584 1.128 8.28C0.608 7.976 0.232 7.528 0 6.936L1.416 6.108C1.624 6.78 2.128 7.116 2.928 7.116C3.352 7.116 3.68 7.016 3.912 6.816C4.152 6.608 4.272 6.328 4.272 5.976C4.272 5.632 4.156 5.356 3.924 5.148C3.692 4.94 3.376 4.836 2.976 4.836H0.432L0.768 0.168H5.532V1.716H2.304L2.196 3.228H3.06Z"
            fill="white"
          />
          <Path
            d="M9.98391 8.736C8.93591 8.736 8.11191 8.34 7.51191 7.548C6.91991 6.748 6.62391 5.688 6.62391 4.368C6.62391 3.048 6.91991 1.992 7.51191 1.2C8.11191 0.4 8.93591 0 9.98391 0C11.0399 0 11.8639 0.4 12.4559 1.2C13.0479 1.992 13.3439 3.048 13.3439 4.368C13.3439 5.688 13.0479 6.748 12.4559 7.548C11.8639 8.34 11.0399 8.736 9.98391 8.736ZM8.71191 6.42C8.99991 6.884 9.42391 7.116 9.98391 7.116C10.5439 7.116 10.9679 6.88 11.2559 6.408C11.5519 5.936 11.6999 5.256 11.6999 4.368C11.6999 3.472 11.5519 2.788 11.2559 2.316C10.9679 1.844 10.5439 1.608 9.98391 1.608C9.42391 1.608 8.99991 1.844 8.71191 2.316C8.42391 2.788 8.27991 3.472 8.27991 4.368C8.27991 5.264 8.42391 5.948 8.71191 6.42Z"
            fill="white"
          />
          <Path
            d="M16.0905 4.128C15.8905 4.328 15.6505 4.428 15.3705 4.428C15.0905 4.428 14.8505 4.328 14.6505 4.128C14.4505 3.928 14.3505 3.688 14.3505 3.408C14.3505 3.128 14.4505 2.888 14.6505 2.688C14.8505 2.488 15.0905 2.388 15.3705 2.388C15.6505 2.388 15.8905 2.488 16.0905 2.688C16.2905 2.888 16.3905 3.128 16.3905 3.408C16.3905 3.688 16.2905 3.928 16.0905 4.128ZM16.0905 8.424C15.8905 8.624 15.6505 8.724 15.3705 8.724C15.0905 8.724 14.8505 8.624 14.6505 8.424C14.4505 8.224 14.3505 7.984 14.3505 7.704C14.3505 7.424 14.4505 7.184 14.6505 6.984C14.8505 6.784 15.0905 6.684 15.3705 6.684C15.6505 6.684 15.8905 6.784 16.0905 6.984C16.2905 7.184 16.3905 7.424 16.3905 7.704C16.3905 7.984 16.2905 8.224 16.0905 8.424Z"
            fill="white"
          />
          <Path
            d="M20.3334 3.228C21.1414 3.228 21.8214 3.472 22.3734 3.96C22.9254 4.44 23.2014 5.112 23.2014 5.976C23.2014 6.84 22.9094 7.516 22.3254 8.004C21.7494 8.492 21.0414 8.736 20.2014 8.736C19.5214 8.736 18.9214 8.584 18.4014 8.28C17.8814 7.976 17.5054 7.528 17.2734 6.936L18.6894 6.108C18.8974 6.78 19.4014 7.116 20.2014 7.116C20.6254 7.116 20.9534 7.016 21.1854 6.816C21.4254 6.608 21.5454 6.328 21.5454 5.976C21.5454 5.632 21.4294 5.356 21.1974 5.148C20.9654 4.94 20.6494 4.836 20.2494 4.836H17.7054L18.0414 0.168H22.8054V1.716H19.5774L19.4694 3.228H20.3334Z"
            fill="white"
          />
          <Path
            d="M27.2573 8.736C26.2093 8.736 25.3853 8.34 24.7853 7.548C24.1933 6.748 23.8973 5.688 23.8973 4.368C23.8973 3.048 24.1933 1.992 24.7853 1.2C25.3853 0.4 26.2093 0 27.2573 0C28.3133 0 29.1373 0.4 29.7293 1.2C30.3213 1.992 30.6173 3.048 30.6173 4.368C30.6173 5.688 30.3213 6.748 29.7293 7.548C29.1373 8.34 28.3133 8.736 27.2573 8.736ZM25.9853 6.42C26.2733 6.884 26.6973 7.116 27.2573 7.116C27.8173 7.116 28.2413 6.88 28.5293 6.408C28.8253 5.936 28.9733 5.256 28.9733 4.368C28.9733 3.472 28.8253 2.788 28.5293 2.316C28.2413 1.844 27.8173 1.608 27.2573 1.608C26.6973 1.608 26.2733 1.844 25.9853 2.316C25.6973 2.788 25.5533 3.472 25.5533 4.368C25.5533 5.264 25.6973 5.948 25.9853 6.42Z"
            fill="white"
          />
        </Icon>
      </Hint>
      <Hint onPress={onClickCall} disabledHint={questions.hints.call}>
        <Icon width="19" height="19" viewBox="0 0 19 19">
          <G clipPath="url(#clip0)">
            <Path
              d="M18.3095 0.912682L14.4502 0.0220566C14.0308 -0.0744278 13.6004 0.144517 13.4297 0.537877L11.6484 4.69413C11.4926 5.0578 11.5965 5.48456 11.9045 5.73319L14.1533 7.57382C12.8174 10.4201 10.4832 12.7877 7.57751 14.1496L5.73689 11.9008C5.48454 11.5928 5.0615 11.4889 4.69783 11.6447L0.541575 13.426C0.144505 13.6004 -0.0744407 14.0308 0.0220437 14.4502L0.912669 18.3096C1.00544 18.7103 1.36169 18.9998 1.78103 18.9998C11.2847 18.9998 18.9998 11.2996 18.9998 1.78104C18.9998 1.36542 18.714 1.00546 18.3095 0.912682Z"
              fill="white"
            />
          </G>
          <Defs>
            <ClipPath id="clip0">
              <Rect width="19" height="19" fill="white" />
            </ClipPath>
          </Defs>
        </Icon>
      </Hint>
      <Hint onPress={onClickHall} disabledHint={questions.hints.hall}>
        <Icon width="25" height="20" viewBox="0 0 25 20" fill="none">
          <Path
            d="M3.75 8.75C5.12891 8.75 6.25 7.62891 6.25 6.25C6.25 4.87109 5.12891 3.75 3.75 3.75C2.37109 3.75 1.25 4.87109 1.25 6.25C1.25 7.62891 2.37109 8.75 3.75 8.75ZM21.25 8.75C22.6289 8.75 23.75 7.62891 23.75 6.25C23.75 4.87109 22.6289 3.75 21.25 3.75C19.8711 3.75 18.75 4.87109 18.75 6.25C18.75 7.62891 19.8711 8.75 21.25 8.75ZM22.5 10H20C19.3125 10 18.6914 10.2773 18.2383 10.7266C19.8125 11.5898 20.9297 13.1484 21.1719 15H23.75C24.4414 15 25 14.4414 25 13.75V12.5C25 11.1211 23.8789 10 22.5 10ZM12.5 10C14.918 10 16.875 8.04297 16.875 5.625C16.875 3.20703 14.918 1.25 12.5 1.25C10.082 1.25 8.125 3.20703 8.125 5.625C8.125 8.04297 10.082 10 12.5 10ZM15.5 11.25H15.1758C14.3633 11.6406 13.4609 11.875 12.5 11.875C11.5391 11.875 10.6406 11.6406 9.82422 11.25H9.5C7.01562 11.25 5 13.2656 5 15.75V16.875C5 17.9102 5.83984 18.75 6.875 18.75H18.125C19.1602 18.75 20 17.9102 20 16.875V15.75C20 13.2656 17.9844 11.25 15.5 11.25ZM6.76172 10.7266C6.30859 10.2773 5.6875 10 5 10H2.5C1.12109 10 0 11.1211 0 12.5V13.75C0 14.4414 0.558594 15 1.25 15H3.82422C4.07031 13.1484 5.1875 11.5898 6.76172 10.7266Z"
            fill="white"
          />
        </Icon>
      </Hint>
      <Modal animationType={'slide'} visible={half} transparent>
        <ModalWrapper>
          <ModalClose onPress={() => setHalf(false)}>
            <Icon viewBox="0 0 512 512">
              <Path
                fill="currentColor"
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"
              />
            </Icon>
          </ModalClose>
          <HintText>{getHint('half')}</HintText>
        </ModalWrapper>
      </Modal>
      <Modal animationType={'slide'} visible={call} transparent>
        <ModalWrapper>
          <ModalClose onPress={() => setCall(false)}>
            <Icon viewBox="0 0 512 512">
              <Path
                fill="currentColor"
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"
              />
            </Icon>
          </ModalClose>
          <HintText>{getHint('call')}</HintText>
        </ModalWrapper>
      </Modal>
      <Modal animationType={'slide'} visible={hall} transparent>
        <ModalWrapper>
          <ModalClose onPress={() => setHall(false)}>
            <Icon viewBox="0 0 512 512">
              <Path
                fill="currentColor"
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"
              />
            </Icon>
          </ModalClose>
          <HintText>{getHint('hall')}</HintText>
        </ModalWrapper>
      </Modal>
    </Container>
  );
};

export default connector(Hints);
