import React, {Component} from 'react';
import classes from './Templates.module.css';

export default class Templates extends Component {
    render() {
        return (
            <div className={classes.templates}>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}