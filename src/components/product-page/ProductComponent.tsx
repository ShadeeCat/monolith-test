import React from 'react';

import { Product, ProductImage, Attribute } from '../../App'
import { imageLoader } from '../../services/image-loader'
import "../../assets/styles/main.css"

export function ProductComponent (props: { product: Product, key: string }) {
	return <main>
		<div className="gallery">
			<div className="main_pic">
				<img src={ imageLoader(props.product.images[0].url) } alt={ props.product.images[0].title }/>
			</div>
			<div className="secondary_pics">
			{
				props.product.images.length >= 2 && props.product.images.slice(1).map(
					(img: ProductImage) => <img src={ imageLoader(img.url) } alt={ img.title } key={ img.url } />
				)
			}
			</div>
		</div>
		<div className="product_description">
			<h2 id="title"> { props.product.title} </h2>
			<p id="price"> $ { props.product.min_price }</p>
			<p className="description"> { props.product.description } </p>
		</div>
		<FormComponent formParams={ props.product.attributes } />
	</main>
}

interface FormComponentProps { formParams: Attribute[] }
class FormComponent extends React.Component<FormComponentProps, { quantity: number } > {

	constructor(props: FormComponentProps) {
		super(props);
		this.state = { quantity: 0 };
		props.formParams.forEach(attr => {
			this.state[`attr-${ attr.id }`] = null
		})
	}

	incrementCounter = () => {
		this.setState({ quantity: this.state.quantity + 1 })
	};
	decrementCounter = () => {
		this.setState({ quantity: this.state.quantity - 1 })
	};

	setAttribute = (e: React.SyntheticEvent<HTMLSelectElement>) => {
		const { state } = this;
		const attrId = e.currentTarget.dataset.attrId;
		state[`attr-${ attrId }`] = e.currentTarget.value;
		this.setState(state)
	};

	render() {
		const selectList = this.props.formParams.length && this.props.formParams.map((select: Attribute) => {
			const selectTag = <label key={ select.id }>
				<select
					name={ select.title.toLowerCase().replace(/ /g, '_') }
					id={ select.title.toLowerCase().replace(/ /g, '_') }
					onChange={ this.setAttribute }
					data-attr-id={ select.id }
				>
					<option>{ select.title }</option>
					{
						select.labels.length && select.labels.map(label => <option defaultValue={ label.data } key={ label.id } > { label.title } </option>)
					}
				</select>
			</label>;
			return selectTag
		});

		return <div className="options_choice">
			{ selectList }
			<div className="add_to_card">
				<span>Quantity:</span>
				<div>
					<button className="dec_symbol" onClick={ this.decrementCounter }> </button>
					<input type="number" value={this.state.quantity} />
					<button className="inc_symbol" onClick={ this.incrementCounter } > </button>
				</div>
			</div>
			<button onClick={ () => { console.log(this.state); } }>Add To Card</button>
		</div>
	}
}

