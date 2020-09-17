import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import ConfirmedButton from './ConfirmedButton'
import Page from "../Shared/Page"
export default function() {
	return <Page name="settings"> 
		<WelcomeMessage /> 
		<ConfirmedButton/>
	</Page>
}