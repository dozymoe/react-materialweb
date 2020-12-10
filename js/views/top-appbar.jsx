import { MDCTopAppBar } From '@material/top-app-bar';
import React, { Component } from 'react';


export class TopAppBar extends Component
{
    constructor(props)
    {
        super(props);
        this.el = new React.createRef();
    }

    componentDidMount()
    {
        this.mdc = new MDCTopAppBar(this.el.current);
    }

    componentWillUnmount()
    {
        this.mdc.destroy();
    }

    render()
    {
    }
}
