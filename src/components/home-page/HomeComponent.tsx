import React from "react"
import { NavLink } from 'react-router-dom'

import { imageLoader } from '../../services/image-loader'

import { Product } from "../product-page/ProductComponent"

import "../../assets/styles/home.css"

export class HomeComponent extends React.Component <{ data: Product[] }> {

	state = {
		filteredSearch: "",
		minPrice: 0
	}
	handleChange = event => {
    	this.setState({ filteredSearch: event.target.value });
  	};
  	handleMinPrice = event => {
  		this.setState({ minPrice: event.target.value })
  	} 
  	
	render() {
		const filteredData = this.props.data.filter(product => {
			return this.state.filteredSearch 
				? product.title.toLowerCase().indexOf(this.state.filteredSearch) !== -1
				: true
		}).filter(product => Number(product.min_price) > this.state.minPrice)
		

		const productList = this.props.data;
		let minNum = Infinity;
		let maxNum = 0;
		for (let i = 0; i < productList.length; ++i) {
			const price = Number(productList[i].min_price);
			if (price < minNum) {
				minNum = price
			}
			if (price > maxNum) {
				maxNum = price
			}
		}

		return <main>
			<form className="form_product_list">
				<label className="search_filter">
					<span>🔍</span>
					<input type="search" value={this.state.filteredSearch} name="searchFilter" placeholder="Search..." onChange={this.handleChange}  />
				</label>
				<h2>PRODUCTS</h2>
				<label className="range_filter">
					<span>Filter by price</span>
					<input type="range" name="rangeFilter" min={minNum} max={maxNum} step="10" onChange={this.handleMinPrice} />
				</label>
			</form>
				<ProductList filteredProductList={ filteredData }  />
			
		</main>
	}
}

const ProductList = (props) => (
	<ul className="item_list">
		{
			props.filteredProductList.map( productElement => (
				<li key={productElement.id}>
					<SingleProduct product={productElement} />
				</li>
			))
		}
		</ul>
	)
const SingleProduct = (props) => (
	<NavLink to={ `/products/${ props.product.id }` } >
		<img src={ imageLoader(props.product.images[0].url) } alt={props.product.title} ></img>
		<h4>{ props.product.title }</h4>
		<p> {props.product.min_price} </p>
	</NavLink>
)