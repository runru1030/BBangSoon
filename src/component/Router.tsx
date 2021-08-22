import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Feed from "../routes/Feed";
import Loding from "../routes/Loding";
import Login from "../routes/Login";
import Main from "../routes/Main";
import Store from "../routes/Store";
import StoreImg from "../routes/StoreImg";
import Surrounding from "../routes/Surrounding";

type AppProps = {
    location: {
        si: string,
        gu: string,
        dong: string,
        latitude: number,
        longitude: number,
        detail: string
    },
    isLoding:boolean,
    isLoggedin:boolean


}
const AppRouter: React.FC<AppProps> = ({ location , isLoding, isLoggedin}) => {
    return (
        <Router>

            <Switch>
                {isLoding?
                <Route exact path="/">
                <Loding />
            </Route>
                :<Route exact path="/">
                    <Main location={location} />
                </Route>}
                <Route exact path="/surrounding">
                    <Surrounding />
                </Route>
                <Route exact path="/store">
                    <Store />
                </Route>
                <Route exact path="/store/image">
                    <StoreImg/>
                </Route>
                <Route exact path="/auth">
                    <Login/>
                </Route>
                <Route exact path="/feed">
                    <Feed/>
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;