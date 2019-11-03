import React from "react"
import { NavLink } from 'react-router-dom'

import { imageLoader } from '../../services/image-loader'

import { Product } from "../product-page/ProductComponent"

import "../../assets/styles/home.css"

export class HomeComponent extends React.Component <{ data: Product[] }> {

	state = {
		filteredSearch: "",
		minPrice: 0,
		maxPrice: Infinity
	}
	handleChange = event => {
		
    	this.setState({ filteredSearch: event.target.value });
  	};
		render() {

			var filteredData = this.props.data.filter(item => {
				return this.state.filteredSearch 
					? item.title.toLowerCase().indexOf(this.state.filteredSearch) !== -1
					: true
			})
				// if ( !this.state.filteredSearch ) {
				// 	return true 
				// } else {
				// 	return item.title.indexOf(this.state.filteredSearch) !== -1
				// }
				// if (item.title.indexOf(this.state.filteredSearch) !== -1) {
				// 	return true
				// } else {
				// 	return false 
				// }

			// var filteredData = this.props.data.filter(item => {
			// 	this.state.filteredSearch.includes(this.state.filteredSearch)
			// })
//
			var filteredDataRange = this.props.data.filter(item => {
				// if ( this.state.minPrice < Number(item.min_price) && ( this.state.maxPrice > Number(item.)  )
			})

			return <main>
				<form>
					<label>
						<span>🔍</span>
						<input type="search" value={this.state.filteredSearch} onChange={this.handleChange} name="searchFilter" />
					</label>
					<h2>PRODUCTS</h2>
					<label>
						<span>Filter by price</span>
						<input type="range" name="rangeFilter" />
					</label>
				</form>
				<ul>
					{
						filteredData.map( productElement => (
							<NavLink to={ `/products/${ productElement.id }` } key={productElement.id}>
								<SingleProduct product={productElement} />
							</NavLink>
						))
					}
				</ul>
			</main>
	}
}
const SingleProduct = (props) => (
	<li>			
		<img src={ imageLoader(props.product.images[0].url) } alt={props.product.title} ></img>
		<h4>{ props.product.title }</h4>
		<p> {props.product.min_price} </p>
	</li>
)