import React from 'react';
import styled, {css} from 'styled-components';

const CoinImage = styled.img`
	height: 50px;
	${props => props.spolight && css`
		height: 200px;
		margin: auto;
		display: block;
	`}
`


export default function ({coin, spolight}) {
	return <CoinImage 
		spolight={spolight}
		alt={coin.CoinSymbol}
		src={`http://cryptocompare.com/${
			coin.ImageUrl
		}`}
	/>;
}