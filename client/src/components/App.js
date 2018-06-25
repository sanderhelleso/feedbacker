// import React & React router
import React from "react";
import { BrowserRouter, Route} from "react-router-dom";

// dummy components
const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>


// create App component
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route exact path="/" component ={Landing} />
                    <Route path="/surveys" component ={Dashboard} />
                </div>
            </BrowserRouter>
        </div>
    );
};

// export App component
export default App;