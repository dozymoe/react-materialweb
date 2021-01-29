import { MDCBanner } from '@material/banner';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class Banner extends Component
{
    WANT_CHILDREN = true
    MODES = ['default', 'stacked']

    prepare()
    {
        if (this.mode === 'stacked')
        {
            this.values.className.push('mdc-banner--mobile-stacked');
        }
    }

    componentDidMount()
    {
        this.mdc = new MDCBanner(this.el.current);
    }

    template()
    {
        const values = this.values, tag = values.tag;
        return (

<tag ref={this.el} role="banner" className={'mdc-banner ' + values.className}
    {...values.props}>
  <div role="status" aria-live="assertive" className="mdc-banner__content">
    {values.child}
  </div>
</tag>

        );
    }
}


Banner.Content = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, tag = values.tag;
        return (

<tag className={'mdc-banner__graphic-text-wrapper ' + values.className}
    {...values.props}>
  {values.child}
</tag>

        );
    }
}


Banner.Icon = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, tag = values.tag;
        return (

<tag role="img" alt={values.label} title={values.label}
    className="mdc-banner__graphic">
  <span className={'mdc-banner__icon ' + values.className} {...values.props}>
    {values.child}
  </span>
</tag>

        );
    }
}


Banner.Text = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, tag = values.tag;
        return (

<tag className={'mdc-banner__text ' + values.className} {...values.props}>
  {values.child}
</tag>

        );
    }
}


Banner.Actions = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, tag = values.tag;
        return (

<tag className={'mdc-banner__actions ' + values.className} {...values.props}>
  {values.child}
</tag>

        );
    }
}
