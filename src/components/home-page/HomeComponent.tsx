import React from "react"
import { NavLink } from 'react-router-dom'


import { imageLoader } from '../../services/image-loader'

import { Product } from "../product-page/ProductComponent"

export class HomeComponent extends React.Component <{ data: Product[] }> {

		render() {
			return <div>
				<ul>
					{
						this.props.data.map( el => (
							<NavLink to={ `/products/${ el.id }` } key={el.id}>
								<SingleProduct product={el} />
							</NavLink>
						))
					}
				</ul>
			</div>
	}
}
const SingleProduct = (props: { product: Product } ) => (
	<li>			
		<img src={ imageLoader(props.product.images[0].url) } alt={props.product.title} ></img>
		<p>{ props.product.title }</p>
		<p> {props.product.min_price} </p>
	</li>
)