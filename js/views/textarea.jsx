import { MDCTextField } from '@material/textfield';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class TextArea extends Component
{
    WANT_FORM_FIELD = true
    MODES = ['filled', 'outlined']
    DEFAULT_TAG = <label/>

    prepare_attributes(attrs, default_)
    {
        attrs['aria-label'] = this.values.label;
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
        + 'mdc-text-field--textarea mdc-text-field--no-label '
        + values.className}
    {...values.props}>
  <span className="mdc-text-field__ripple" />
  <span className="mdc-text-field__resizer">
    {values.element}
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
        + 'mdc-text-field-textarea mdc-text-field--no-label '
        + values.className}
    {...values.props}>
  <span className="mdc-text-field__resizer">
    {values.element}
  </span>
  <span className="mdc-notched-outline">
    <span className="mdc-notched-outline__leading" />
    <span className="mdc-notched-outline__trailing" />
  </span>
</tag>

        );
    }
}
