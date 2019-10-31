import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import "./App.css";

import { HomeComponent } from "./components/home-page/HomeComponent";
import { ProdComp } from  "./components/product-page/ProductComponent";

class App extends React.Component {
	state = {
		cartItems: []
	};
	componentDidMount () {
		fetch('http://localhost:3000/data.json')
			.then(response => response.json())
			.then(cartItems => {
				this.setState({ cartItems: cartItems.data })
			})
	}
	render () {
	  return (
	  	<Router>
	    	<div className="App">
				<header>
					<div>
						<h1><span>SPECTR</span><span className="diff_char">U</span><span>M</span></h1>
					</div>
					<nav>
						<ul>
							<li> <Link to="/">HOME</Link> </li>
							<li> <Link to="/products/1">CART</Link> </li>
						</ul>
					</nav>
				</header>
				<Switch>
					<Route exact path='/' component={props => <HomeComponent {...props} data={ this.state.cartItems } />} />
					<Route path='/products/:product_id' component={props => <ProdComp {...props} data={ this.state.cartItems }  />} />
				</Switch>
	    	</div>
		</Router>
	  );
	}
}

export default App;