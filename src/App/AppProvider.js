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
			filteredCoins: [],
			// prices: [],
			...this.savedSettings(),
			setPage: this.setPage,
			addCoin: this.addCoin,
			removeCoin: this.removeCoin,
			isInFavorites: this.isInFavorites,
			confirmFavorites: this.confirmFavorites,
			setFilteredCoins: this.setFilteredCoins,
		}
		// localStorage.clear();
	}

	isInFavorites = key => _.includes(this.state.favorites, key)

	componentDidMount = () => {
		this.fetchCoins();
		this.fetchPrices();
	}

	fetchCoins = async () => {
		let coinList = (await cc.coinList()).Data
		this.setState({coinList});
		// debugger
		// this.setFilteredCoins(coinList.slice(0, 100));
	}

	fetchPrices = async () => {
		if (this.state.firstVisit) return;
		let prices = await this.prices();
		prices = prices.filter(price => Object.keys(price).length);
		console.log(prices);
		this.setState({prices});
	}

	prices = async () => {
		let returnData = [];
		for (var i = 0; i < this.state.favorites.length; i++) {
			try {
				let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
				returnData.push(priceData);
			} catch(e) {
				console.warn('Fetch price error: ', e);
			}
		}
		return returnData;
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
			page: 'dashboard',
			prices: null,
		}, () => {
			// debugger
			this.fetchPrices();
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

	setFilteredCoins = filteredCoins => this.setState({filteredCoins});

	setPage = page => this.setState({page});

	render() {
		return (<AppContext.Provider value={this.state}>
			{this.props.children}
			</AppContext.Provider>)
	}
}