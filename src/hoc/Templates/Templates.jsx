import React, {Component} from 'react';
import classes from './Templates.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle';
import Drawer from '../../components/Navigation/Drawer';

export default class Templates extends Component {
    state = {
        menu: false
    }
    toggleMenu = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    onCloseBackdrop = () => {
        this.setState({
            menu: false
        })
    }
    render() {
        return (
            <div className={classes.templates}>
                <Drawer
                    isOpen={this.state.menu}
                    onCloseBackdrop={this.onCloseBackdrop}
                />
                <MenuToggle
                    onToggle={this.toggleMenu}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}