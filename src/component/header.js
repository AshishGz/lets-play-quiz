import React from 'react';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import {PROJECT_NAME} from "../utils/string";

export default function Header() {

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit">
                    {PROJECT_NAME}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
