import React from 'react';

export class GeneralHeader extends React.Component{
    render() {
        return <header>
            <div>
                <h1><span>SPECTR</span>
                    <span className="diff_char">U</span>
                    <span>M</span></h1>
            </div>
            <nav>
                <a href="# ">HOME</a>
                <a href="# ">CART</a>
            </nav>
        </header>
    }
}