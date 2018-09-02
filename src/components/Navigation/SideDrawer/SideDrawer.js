import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const sideDrawer =() => {

    return (
        <Aux>
        <Backdrop show/>
        <div className={ classes.SideDrawer }>
            <Logo height="11%"/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    )
};

export default sideDrawer;