import React from "react"

import { imageLoader } from '../../services/image-loader'

import { Product } from "../product-page/ProductComponent"
import 

export class HomeComponent extends React.Component <{ data: Product[] }> {

		render() {
			// @ts-ignore
			console.log( this.props.data[0] )
    		return <div>
    			{
    				this.props.data.map( el => (
    					// @ts-ignore
    						<img src={ imageLoader(el.images[0]) }></img>
    					)
    				)
    			}
    		</div>
    }
}