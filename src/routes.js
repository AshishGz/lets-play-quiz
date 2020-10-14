import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import HomePage from "./pages/homePage";
import CatogeryDetail from "./pages/catogeryDetail";
import QuizPage from "./pages/quizPage";
import QuizResult from "./pages/quizResult";
import PlayersList from "./component/playesList";
import SignIn from "./pages/signIn";
import ManagePoll from "./pages/managePoll";
import PollList from "./pages/poll_list";
import PlayPoll from "./pages/play_pool";
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
                    <Route path="/play/:catogeryId/:level/:number" exact>
                        <QuizPage/>
                    </Route>
                    <Route path="/result" exact>
                        <QuizResult/>
                    </Route>
                    <Route path="/signin" exact>
                        <SignIn/>
                    </Route>
                    <Route path="/poll/manage" exact>
                        <ManagePoll/>
                    </Route>
                    <Route path="/poll/list" exact>
                        <PollList/>
                    </Route> <Route path="/playPoll/:id" exact>
                        <PlayPoll/>
                    </Route>
                </Switch>
        </Router>
        </div>
    )
}
