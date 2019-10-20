import React from 'react';
import "./App.css";

import { GeneralHeader } from "./components/generalHeader";
import { ProductComponent } from  "./components/product-page/ProductComponent";

export interface Product {
	id: string,
	title: string,
	images: ProductImage[],
	description: string,
	min_price: string,
	attributes: Attribute[],
}
export interface ProductImage {
	title: string,
	url: string
}
export interface Attribute {
	id: string,
	title: string,
	type: 'COLOR' | 'TEXT',
	labels: (Color | Text)[]
}
interface Color {
	id: string,
	title: string,
	data: string,
}
interface Text {
	id: string,
	title: string,
	data: string,
}
class App extends React.Component {
	state = {
		cartItems: []
	};
	componentDidMount () {
		fetch('https://fedtest.monolith.co.il/api/Catalog/GetAll')
		.then(response => response.json())
		.then(cartItems => {
			this.setState({ cartItems: cartItems.data })
		})
	}
	render () {
	  return (
	    <div className="App">
	        <GeneralHeader />
	        {
	        	// Generic product page emulation as a result of home page product list click
	        	this.state.cartItems.length && this.state.cartItems.slice(0,1).map(
	        		(product: Product) => <ProductComponent product={ product } key={ product.id } />
	        	)
	        }
	    </div>
	  );
	}
}

export default App;