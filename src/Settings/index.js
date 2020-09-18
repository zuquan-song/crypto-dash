import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import ConfirmedButton from './ConfirmedButton';
import Page from "../Shared/Page";
import CoinGrid from './CoinGrid';

export default function() {
	return <Page name="settings"> 
		<WelcomeMessage /> 
		<CoinGrid topSection />
		<ConfirmedButton/>
		<CoinGrid />
	</Page>
}