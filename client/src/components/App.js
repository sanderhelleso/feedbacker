// import React & React router
import React, { Component } from "react";
import { BrowserRouter, Route} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

// main components
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

// create App component
class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <div className="container">
                            <Route exact path="/" component ={Landing} />
                            <Route exact path="/surveys" component ={Dashboard} />
                            <Route path="/surveys/new" component ={SurveyNew} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

// export App component
export default connect(null, actions)(App);