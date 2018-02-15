import React from 'react';
import Navigation from './Navigation';
import ComponentPage from './ComponentPage';
import componentData from '../../config/componentData';

export default class Docs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: window.location.hash.substr(1)
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({route: window.location.hash.substr(1)})
        })
    }

    filterComponents = (route) => {
        return route ? componentData.filter( component => component.name === route)[0] : componentData[0];
    };

    filterNavComponents = () => {
        return componentData.map(component => component.name);
    };

    render() {
        const {route} = this.state;
        const component = this.filterComponents(route);
        const componentNav = this.filterNavComponents();

        return (
            <div>
                <Navigation components={componentNav} />
                <ComponentPage component={component} />
            </div>
        )
    }
}

