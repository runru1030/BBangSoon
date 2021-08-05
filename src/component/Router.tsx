import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from "../routes/Main";

type AppProps={
    si: string
}
const AppRouter: React.FC<AppProps> = ({si}) => {
    return (
        <Router>

            <Switch>
                <Route>
                    <Main si={si}/>
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;