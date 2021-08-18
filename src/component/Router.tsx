import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loding from "../routes/Loding";
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
    isLoding:boolean


}
const AppRouter: React.FC<AppProps> = ({ location , isLoding}) => {
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
            </Switch>
        </Router>
    );
};

export default AppRouter;