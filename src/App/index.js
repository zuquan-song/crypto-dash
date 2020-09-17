import React from 'react';
import './App.css';
// import Welcome from './WelcomeMessage';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import {AppProvider} from './AppProvider'
import Settings from '../Settings/index';
import Content from "../Shared/Content"
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
    <AppLayout>
      <AppProvider>
        <AppBar />
        <Content>
          <Settings />
        </Content>
      </AppProvider>
    </AppLayout>
  );
}

export default App;
