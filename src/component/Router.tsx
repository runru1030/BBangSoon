import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Feed from "../routes/Feed";
import Review from "../routes/Review";
import Loding from "../routes/Loding";
import Login from "../routes/Login";
import Main from "../routes/Main";
import Store from "../routes/Store";
import StoreImg from "../routes/StoreImg";
import StoreMap from "../routes/StoreMap";
import Wish from "../routes/Wish";

type AppProps = {
    isLoding: boolean,
}
const AppRouter: React.FC<AppProps> = ({ isLoding }) => {
    return (
        <Router>
            <Switch>
                {isLoding ?
                    <Route exact path="/">
                        <Loding />
                    </Route>
                    : <Route exact path="/">
                        <Main />
                    </Route>}
                <Route exact path="/storemap">
                    <StoreMap />
                </Route>
                <Route exact path="/store">
                    <Store />
                </Route>
                <Route exact path="/store/image">
                    <StoreImg />
                </Route>
                <Route exact path="/auth">
                    <Login />
                </Route>
                <Route exact path="/feed">
                    <Feed />
                </Route>
                <Route exact path="/feed/review">
                    <Review />
                </Route>
                <Route exact path="/wish">
                    <Wish />
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;