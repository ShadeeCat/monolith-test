import React from 'react';

import "../../assets/styles/product.css"

export default class PersonProduct extends React.Component{
    render () {
        return <div>
            <div>
                <div className="mainPic">
                    <img src="" alt=""/>
                </div>
                <div className="addPics"></div>
            </div>
            <div>
                <h2 id="capture"></h2>
                <p id="price"></p>
                <p className="description"></p>
            </div>
            <SelectAndAdd />
        </div>
    }
}

class SelectAndAdd extends React.Component {
    state = { counter: 0 };
        // incrementCounter() {this.setState(this.state.counter + 1)}
    render() {
        return <div className="optionsChoice">
            <label>
                <select name="" id="colorChoosing">
                    <option selected>Choose Size</option>
                    <option>Blue</option>
                    <option>Red</option>
                    <option>Yellow</option>
                    <option>Black</option>
                </select>
            </label>
            <label>
                <select name="" id="sizeChoosing">
                    <option value="" selected>Choose Size</option>
                    <option value="">Small</option>
                    <option value="">Medium</option>
                    <option value="">Big</option>
                </select>
            </label>
            <div className="addToCard">
                <span>Quantity:</span>
                <button className="decSymbol"></button>
                <input type="text" value={this.state.counter}/>
                <button className="incSymbol"></button>
            </div>
            <button>Add To Card</button>
        </div>
    }
}

