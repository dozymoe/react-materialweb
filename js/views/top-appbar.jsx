import { MDCTopAppBar } From '@material/top-app-bar';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class TopAppBar extends Component
{
    WANT_CHILDREN = true
    MODES = ['short', 'short_closed', 'fixed', 'prominent', 'dense']
    DEFAULT_TAG = 'header'

    prepare()
    {
        if (this.mode === 'short')
        {
            this.values.className.push('mdc-top-app-bar--short');
        }
        else if (this.mode === 'short_closed')
        {
            this.values.className.push('mdc-top-app-bar--short');
            this.values.className.push('mdc-top-app-bar--short-collapsed');
        }
        else if (this.mode === 'fixed')
        {
            this.values.className.push('mdc-top-app-bar--fixed');
        }
        else if (this.mode === 'prominent')
        {
            this.values.className.push('mdc-top-app-bar--prominent');
        }
        else if (this.mode === 'dense')
        {
            this.values.className.push('mdc-top-app-bar--dense');
        }
    }

    componentDidMount()
    {
        this.mdc = new MDCTopAppBar(this.el.current);
    }


    template()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-top-app-bar ' + values.className} {...values.props}>
  <div className="mdc-top-app-bar__row">
    {values.child}
  </div>
</Tag>

        );
    }
}


TopAppBar.Left = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'section'

    prepare()
    {
        this.context.button_class = ['mdc-top-app-bar__action-item'];
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<tag
    className={'mdc-top-app-bar__section '
        + 'mdc-top-app-bar__section--align-start '
        + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}

TopAppBar.Menu = @asNode class extends Component
{
    WANT_CHILDREN = true

    prepare()
    {
        if (! this.values.label)
        {
            this.values.label = "Open navigation menu";
        }
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<button type="button" aria-label={values.label} title={values.label}
    className={'mdc-top-app-bar__navigation-icon mdc-icon-button '
        + values.className}
    {...values.props}>
  {values.child}
</button>

        );
    }
}

TopAppBar.Title = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-top-app-bar__title ' + values.className} {...values.props}>
  {values.child}
</Tag>'

        );
    }
}

TopAppBar.Right = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'section'

    prepare()
    {
        this.context.button_class = ['mdc-top-app-bar__action-item'];
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag role="toolbar"
    className={'mdc-top-app-bar__section mdc-top-app-bar__section--align-end ' +
        + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}
