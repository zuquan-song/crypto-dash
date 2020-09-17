import React from 'react';

const cc = require('cryptocompare')
cc.setApiKey('4e00efef3b684972fa86f9db09f02b9de44d5d19ee8fed1ae49dfff0ea21e9ee')
export const AppContext = React.createContext();

export class AppProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'dashboard',
			...this.savedSettings(),
			setPage: this.setPage,
			confirmFavorites: this.confirmFavorites
		}
		// localStorage.clear();
	}

	componentDidMount = () => {
		this.fetchCoins();
	}

	fetchCoins = async () => {
		let coinList = (await cc.coinList()).Data
		this.setState({coinList})
	}

	confirmFavorites = () => {
		this.setState({
			firstVisit: false,
			page: 'dashboard'
		});
		localStorage.setItem('cryptoDash', JSON.stringify({
			test: 'hello'
		}));
	}

	savedSettings() {
		let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))
		console.log('cryptoDash', cryptoDashData)
		if (!cryptoDashData) {
			return {page: 'settings', firstVisit: true}
		}
		return {}; 
	}

	setPage = page => this.setState({page});

	render() {
		return (<AppContext.Provider value={this.state}>
			{this.props.children}
			</AppContext.Provider>)
	}
}