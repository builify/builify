import React from "react";
import Logo from "./Logo";
import AsidePrimaryNavigation from "./AsidePrimaryNavigation";

class AsideStartNavigation extends React.Component {
    render () {
        return (
            <div className="aside__item">
              <Logo />
              <AsidePrimaryNavigation />
            </div>
        );
    };
};

export default AsideStartNavigation;