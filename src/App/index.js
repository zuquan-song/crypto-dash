import React from 'react';
import './App.css';
import Welcome from './WelcomeMessage';
import styled, {css} from 'styled-components';

const MyButton = styled.div`
  color: green;

  ${props => props.primary && css`
    color: palevioletred;
  `}
`

const TomatoButton = styled(MyButton)`
  color: tomato;
  border-color: tomato;
`;

function App() {
  return (
    <div>
      <Welcome />
      <MyButton> Hello </MyButton>
      <MyButton primary> Hello </MyButton>
      <TomatoButton primay> Hello </TomatoButton>
    </div>
  );
}

export default App;
