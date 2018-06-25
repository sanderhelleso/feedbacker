import React, { Component } from "react";

// Header component
class Header extends Component {
    render() {
        return(
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">
                        Feedbacker
                    </a>
                    <ul className="right">
                        <li>
                            <a>Login With Google</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;