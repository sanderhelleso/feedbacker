// import component from React
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

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
                return [
                    <li key="1"><Payments /></li>,
                    <li key="2" style={{ margin: "0 10px" }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="3"><a href="/api/logout">Logout</a></li>
                ];
        }
    }
    
    // render function
    render() {
        return(
            <nav style={{ marginBottom: "50px" }}>
                <div className="nav-wrapper">
                    <Link style={{ margin: "0 20px" }} to={this.props.auth ? "/surveys" : "/"}
                        className="left brand-logo">
                        Feedbacker
                    </Link>
                    <ul style={{ margin: "0 10px" }} className="right">
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