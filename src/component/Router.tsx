import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from "../routes/Main";
import Surrounding from "../routes/Surrounding";

type AppProps = {
    location: {
        si: string,
        gu: string,
        dong: string,
        latitude: number,
        longitude: number,
        detail: string
    }

}
const AppRouter: React.FC<AppProps> = ({ location }) => {
    return (
        <Router>

            <Switch>
                <Route exact path="/">
                    <Main location={location} />
                </Route>
                <Route exact path="/surrounding">
                    <Surrounding location={location} />
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;