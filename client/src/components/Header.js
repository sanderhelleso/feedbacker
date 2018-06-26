// import component from React
import React, { Component } from "react";
import { connect } from "react-redux";

// Header component
class Header extends Component {

    // auth states
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;

            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;

            default:
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }

    // render function
    render() {
        return(
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">
                        Feedbacker
                    </a>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

// map component state
function mapStateToProps({ auth }) {
    return { auth }
}

// export Header component
export default connect(mapStateToProps)(Header);