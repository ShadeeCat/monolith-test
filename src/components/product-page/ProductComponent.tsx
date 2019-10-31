import React from 'react';

import { imageLoader } from '../../services/image-loader'
import "../../assets/styles/main.css"

export interface Product {
	id: string,
	title: string,
	images: ProductImage[],
	description: string,
	min_price: string,
	attributes: Attribute[],
}
interface ProductImage {
	title: string,
	url: string
}
interface Attribute {
	id: string,
	title: string,
	type: 'COLOR' | 'TEXT',
	labels: (Color | Text)[],
}
interface Color {
	id: string,
	title: string,
	data: string,
	isSelected: boolean
}
interface Text {
	id: string,
	title: string,
	data: string,
	isSelected: boolean
}

interface Variant {
	id: string,
	title: string,
	image: ProductImage,
	price: string,
	labels: Label[]
}
interface Label {
	attribute_id: string,
	label_id: string
}
interface ProdComProps {
	match: { params: { product_id: string } }
}
interface cartItemsState {
	cartItems: Product[]
}

export class ProdComp extends React.Component<ProdComProps, cartItemsState> {
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
		const productId = this.props.match.params.product_id
		const productForRendering = this.state.cartItems.find( el => productId === el.id );
		console.log(productForRendering)
		return (
			<div className="App">
			{
				productForRendering 
				? <ProductComponent product={ productForRendering } />
				: <h2>Product not found</h2>
			}
			</div>
		);
	}
}

interface ProductComponentProps {
	product: Product
}
interface ProductComponenState {
	attributes: Attribute[], 
	variant: Variant
}
class ProductComponent extends React.Component <ProductComponentProps, ProductComponenState > {
	state = {
		attributes: this.props.product.attributes.map(a => {
			a.labels = a.labels.map(label => {
				label.isSelected = false
				return label
			})
			return a
		}),
		variant: {
			id: null,
			title: null,
			image: null,
			price: null,
			labels: null,
		}
	}
	createVariant = (attributes: AttributesLabels['labels']) => {
		console.log(this.state)
		// console.log(props.product.attributes.find(attr => attr.type = 'COLOR'));
		
		const { variant } = this.state
		const { product } = this.props
		variant.id = product.id
		variant.title = product.title
		variant.price = product.min_price
		this.setState({ variant })

		alert(this.state.variant.id);
	}
	changeThePic = (color: string) => {
		console.log(color)
		const { attributes } = this.state
		attributes
			.find(attr => attr.type === 'COLOR')
			.labels.find(l => l.title.toLowerCase() === color)
			.isSelected = true
		console.log(attributes);
		this.setState({ attributes })
	}
	render () {
		console.log(this.state.attributes)
		return <main>
			<Gallery imagesList={ this.props.product.images } changeThePic={this.changeThePic} />
			<div className="product_description">
				<h2 id="title"> { this.props.product.title} </h2>
				<p id="price"> $ { this.props.product.min_price }</p>
				<p className="description"> { this.props.product.description } </p>
			</div>
			<FormComponent formParams={ this.state.attributes } addToCart={ this.createVariant }  />
		</main>
	}
}

interface GalleryStateImage extends ProductImage { isActive: boolean }
interface GalleryProps {
	imagesList: ProductImage[], 
	changeThePic: (picTitle: string) => void
} 
interface GalleryState {
	imagesList: GalleryStateImage[]
}
class Gallery extends React.Component<GalleryProps, GalleryState > {
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
		console.log(this.props.imagesList)
		return <div className="gallery">
			{
				this.props.imagesList.length && this.props.imagesList.map(
					(img: GalleryStateImage, i) => (
						<img
							className={ img.isActive ? 'active' : '' }
							src={ imageLoader(img.url) }
							alt={ img.title }
							key={ img.url }
							onClick={ () => {
								console.log(img.url)
								this.setImageActive(i) 
								this.props.changeThePic(img.title.match(/^(.+)\.[a-z]+$/)[1].replace(/-/g, ' '))
							} }
						/>
					)
				)
			}
		</div>
	}
}

interface AttributesLabels { 
	quantity: number, 
	labels: Label[] 
}
interface FormComponentProps { formParams: Attribute[], addToCart: (AttributesLabels) => void }
class FormComponent extends React.Component<FormComponentProps, AttributesLabels > {
	constructor(props: FormComponentProps) {
		super(props);
		console.log(props.formParams)
		this.state = { quantity: 0, labels: [] };
		props.formParams.forEach(attr => {
			this.state.labels.push({ attribute_id: attr.id, label_id: null })
		})
		console.log(props.formParams)
	}

	incrementCounter = () => {
		this.setState({ quantity: +this.state.quantity + 1 })
	};
	decrementCounter = () => {
		this.setState({ quantity: +this.state.quantity - 1 })
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
		console.log(this.props.formParams)
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
						select.labels.length && select.labels.map(label => 
							<option 
								selected={label.isSelected} 
								value={ label.id } 
								key={ label.id } > { label.title } </option>)
					}
				</select>
			</label>;
			return selectTag
		});
		console.log(this.state.labels)
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