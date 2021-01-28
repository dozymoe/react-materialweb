import { MDCTextField } from '@material/textfield';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class TextField extends Component
{
    WANT_CHILDREN = true
    MODES = ['filled', 'outlined', 'fullwidth']
    DEFAULT_TAG = <label/>

    prepare_attributes(attrs, default_)
    {
        if (this.mode === 'fullwidth')
        {
            attrs['aria-label'] = this.values.label;
        }
        else
        {
            attrs['aria-labelledby'] = this.values.id + '-label';
        }
        if (!attrs.placeholder)
        {
            attrs.placeholder = this.values.label;
        }
        attrs.className.push('mdc-text-field__input');
    }

    componentDidMount()
    {
        this.mdc = new MDCTextField(this.el.current);
    }

    template_filled()
    {
        const values = this.values, tag = values.tag;
        return (

<tag ref={this.el}
    className={'mdc-text-field mdc-text-field--filled '
        + values.className}
    {...values.props}>
  <span className="mdc-text-field__ripple" />
  {values.element}
  <span id={values.id + '-label'} className="mdc-floating-label">
    {values.label}
  </span>
  <span className="mdc-line-ripple" />
</tag>

        );
    }

    template_outlined()
    {
        const values = this.values, tag = values.tag;
        return (

<tag ref={this.el}
    className={'mdc-text-field mdc-text-field--outlined '
        + values.className}
    {...values.props}>
  {values.element}
  <span className="mdc-notched-outline">
    <span className="mdc-notched-outline__leading" />
    <span className="mdc-notched-outline__notch">
      <span id={values.id + '-label'} className="mdc-floating-label">
        {values.label}
      </span>
    </span>
    <span className="mdc-notched-outline__trailing" />
  </span>
</tag>

        );
    }

    template_fullwidth()
    {
        const values = this.values, tag = values.tag;
        return (

<tag ref={this.el}
    className={'mdc-text-field mdc-text-field--filled '
        + 'mdc-text-field--fullwidth '
        + values.className}
    {...values.props}>
  <span className="mdc-text-field__ripple" />
  {values.element}
  <span className="mdc-line-ripple" />
</tag>

        );
    }
}
