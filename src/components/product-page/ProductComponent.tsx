import React from 'react';

import { Product, ProductImage, Attribute } from '../../App'
import { imageLoader } from '../../services/image-loader'
import "../../assets/styles/main.css"

interface Variant {
	id: string,
	title: string,
	image: ProductImage,
	price: string,
	labels: Label[]
}
interface Label {
	attribute_id: String,
	label_id: String
}
export function ProductComponent (props: { product: Product, key: string }) {
	const variant: Variant = {
		id: null,
		title: null,
		image: null,
		price: null,
		labels: null,
	}
	function createVariant(attributes: { labels: AttributesLabels['labels'], colorId: string }) {
		console.log(props.product.attributes.find(attr => attr.type = 'COLOR'));
		// variant.id is not taken from catalog/get API
		variant.id = props.product.id
		variant.title = props.product.title
		variant.price = props.product.min_price
		variant.labels = attributes.labels
		alert(variant.id);
	}
	console.log(props.product.attributes);
	return <main>
		<Gallery imagesList={ props.product.images } />
		<div className="product_description">
			<h2 id="title"> { props.product.title} </h2>
			<p id="price"> $ { props.product.min_price }</p>
			<p className="description"> { props.product.description } </p>
		</div>
		<FormComponent formParams={ props.product.attributes } addToCart={ createVariant } />
	</main>
}

interface GalleryStateImage extends ProductImage { isActive: boolean }
class Gallery extends React.Component<{ imagesList: ProductImage[] }, { imagesList: GalleryStateImage[] } > {
	state = {
		imagesList: this.props.imagesList.map(
			(img: GalleryStateImage, i) => { img.isActive = i === 0; return img }
		)
	}
	setImageActive = (index: number) => {
		const images = this.state.imagesList
		images.forEach(img => img.isActive = false)
		images[index].isActive = true
		this.setState({ imagesList: images })
	}
	render () {
		return <div className="gallery">
			{
				this.props.imagesList.length && this.props.imagesList.map(
					(img: GalleryStateImage, i) => (
						<img
							className={ img.isActive ? 'active' : '' }
							src={ imageLoader(img.url) }
							alt={ img.title }
							key={ img.url }
							onClick={ () => { this.setImageActive(i) } }
						/>
					)
				)
			}
		</div>
	}
}

interface AttributesLabels { quantity: number, labels: Label[] }
interface FormComponentProps { formParams: Attribute[], addToCart: (AttributesLabels) => void }
class FormComponent extends React.Component<FormComponentProps, AttributesLabels > {
	constructor(props: FormComponentProps) {
		super(props);
		this.state = { quantity: 0, labels: [] };
		props.formParams.forEach(attr => {
			this.state.labels.push({ attribute_id: attr.id, label_id: null })
		})
	}

	incrementCounter = () => {
		this.setState({ quantity: this.state.quantity + 1 })
	};
	decrementCounter = () => {
		this.setState({ quantity: this.state.quantity - 1 })
	};

	setAttribute = (e: React.SyntheticEvent<HTMLSelectElement>) => {
		let { state } = this;
		const attrId = e.currentTarget.dataset.attrId;
		const index = state.labels.findIndex(l => l.attribute_id === attrId)
		if (index !== -1) {
			state.labels[index].label_id = e.currentTarget.value
		}
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
						select.labels.length && select.labels.map(label => <option value={ label.id } key={ label.id } > { label.title } </option>)
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
			<button onClick={ () => this.props.addToCart(this.state.labels) }>Add To Card</button>
		</div>
	}
}

