import React from 'react';
import _ from 'lodash';

const MAX_FAVORITES = 10;

const cc = require('cryptocompare')
cc.setApiKey('4e00efef3b684972fa86f9db09f02b9de44d5d19ee8fed1ae49dfff0ea21e9ee')
export const AppContext = React.createContext();

export class AppProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'dashboard',
			favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
			...this.savedSettings(),
			setPage: this.setPage,
			addCoin: this.addCoin,
			removeCoin: this.removeCoin,
			isInFavorites: this.isInFavorites,
			confirmFavorites: this.confirmFavorites
		}
		// localStorage.clear();
	}

	isInFavorites = key => _.includes(this.state.favorites, key)

	componentDidMount = () => {
		this.fetchCoins();
	}

	fetchCoins = async () => {
		let coinList = (await cc.coinList()).Data
		this.setState({coinList})
	}

	addCoin = key => {
		let favorites = [...this.state.favorites];
		if (favorites.length < MAX_FAVORITES && !favorites.includes(key)) {
			favorites.push(key);
			this.setState({favorites})
		}
	}
	removeCoin = key => {
		let favorites = [...this.state.favorites];
		this.setState({favorites: _.pull(favorites, key)});
	}

	confirmFavorites = () => {
		this.setState({
			firstVisit: false,
			page: 'dashboard'
		});
		localStorage.setItem('cryptoDash', JSON.stringify({
			favorites: this.state.favorites
		}));
	}

	savedSettings() {
		let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))
		if (!cryptoDashData) {
			return {page: 'settings', firstVisit: true}
		}
		let {favorites} = cryptoDashData;
		return {favorites}; 
	}

	setPage = page => this.setState({page});

	render() {
		return (<AppContext.Provider value={this.state}>
			{this.props.children}
			</AppContext.Provider>)
	}
}