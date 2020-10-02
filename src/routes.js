import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import HomePage from "./pages/homePage";
import CatogeryDetail from "./pages/catogeryDetail";
import QuizPage from "./pages/quizPage";
export default function Routes() {
    return(
        <div>
        <Router>
                <Switch>
                    <Route path="/" exact>
                        <HomePage />
                    </Route>
                    <Route path="/category/:id" exact>
                        <CatogeryDetail />
                    </Route>
                    <Route path="/play" exact>
                        <QuizPage/>
                    </Route>
                </Switch>
        </Router>
        </div>
    )
}
