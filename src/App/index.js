import React from 'react';
import './App.css';
import Welcome from './WelcomeMessage';
import AppLayout from './AppLayout';
import AppBar from './AppBar';

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
      <AppBar/>
      <Welcome />
    </AppLayout>
  );
}

export default App;
