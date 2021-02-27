import { MDCIconButtonToggle } from '@material/icon-button';
import { MDCRipple } from '@material/ripple';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class Button extends Component
{
    WANT_CHILDREN = true
    MODES = ['outlined', 'raised']
    DEFAULT_TAG = 'button'

    componentDidMount()
    {
        this.mdc = new MDCRipple(this.el.current);
    }

    prepare()
    {
        if (this.context.button_class)
        {
            this.values.className.push(...this.context.button_class);
        }
        if (this.mode === 'outlined')
        {
            this.values.className.push('mdc-button--outlined');
        }
        else if (this.mode === 'raised')
        {
            this.values.className.push('mdc-button--raised');
        }
    }

    template()
    {
        const values = this.values, Tag = values.tag;
        return (

<div className="mdc-touch-target-wrapper">
  <Tag ref={this.el}
      className={'mdc-button mdc-button--touch ' + values.className}
      {...values.props}>
    <div className="mdc-button__ripple" />
    {values.child}
    <div className="mdc-button__touch" />
  </Tag>
</div>

        );
    }
}

Button.Label = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'span'

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-button__label ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}

Button.Icon = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'span'

    prepare()
    {
        if (this.context.button_icon_class)
        {
            this.values.className.push(...this.context.button_icon_class);
        }
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag aria-hidden="true" className={'mdc-button__icon ' + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}


@asNode
export class IconButton extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'button'

    componentDidMount()
    {
        this.mdc = new MDCRipple(this.el.current);
        this.mdc.unbounded = true;
    }

    prepare()
    {
        if (this.context.button_icon_class)
        {
            this.values.className.push(...this.context.button_icon_class);
        }
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag ref={this.el} aria-label={values.label} title={values.label}
    className={'mdc-icon-button ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}


@asNode
export class ToggleButton extends Component
{
    NODE_PROPS = ['type', 'state', 'icon_when_on', 'icon_when_off']

    componentDidMount()
    {
        this.mdc = new MDCIconButtonToggle(this.el.current);
    }

    prepare()
    {
        this.values.state = this.eval(this.props.state);
        this.values.icon_when_on = this.props.icon_when_on;
        this.values.icon_when_off = this.props.icon_when_off;

        if (this.context.button_class)
        {
            this.values.className.push(...this.context.button_class);
        }
        if (this.values.state)
        {
            this.values.className.push('mdc-icon-button--on');
            this.values.props['aria-pressed'] = 'true';
        }
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<button ref={this.el} type="button"
    aria-label={values.label} title={values.label}
    aria-pressed={values.state}
    className={'mdc-icon-button toggle ' + values.className} {...values.props}>
  <i className="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">
    {values.icon_when_on}
  </i>
  <i className="material-icons mdc-icon-button__icon">
    {values.icon_when_off}
  </i>
</button>

        );
    }
}
