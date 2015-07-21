import React from "react";

class AsidePrimaryNavigation extends React.Component {
    static propTypes = {
        items: React.PropTypes.array
    };

    static defaultProps = {
        items: [
            {
                "icon": "pe-7s-copy-file",
                "name": "Pages"
            },
            {
                "icon": "pe-7s-display1",
                "name": "Content"
            },
            {
                "icon": "pe-7s-paint-bucket",
                "name": "Design"
            },
            {
                "icon": "pe-7s-tools",
                "name": "More"
            },
            {
                "icon": "pe-7s-look",
                "name": "Preview"
            }
        ]
    };

    constructor (props) {
        super(props);
    }

    render () {
        let navigationItems = this.props.items;

        return (
            <ul className="ab-primarynav">
              {navigationItems.map(function (item) {
                return <li><span className={item.icon}></span>{item.name}</li>
              })}
            </ul>
        );
    };
};

export default AsidePrimaryNavigation;