import { MDCCheckbox } from '@material/checkbox';
import { MDCFormField } from '@material/form-field';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class CheckBox extends Component
{
    WANT_FORM_FIELD = true

    prepare_attributes(attrs, default_)
    {
        if (attrs.indeterminate)
        {
            attrs['data-indeterminate'] = 'true';
        }
        attrs.className.push('mdc-checkbox__native--control');
    }

    prepare()
    {
        if (this.element_attributes().disabled)
        {
            this.values.className.push('mdc-checkbox--disabled');
        }
    }

    template_default()
    {
        const values = this.values, tag = values.tag;
        return (

<tag className={'mdc-form-field ' + values.className} {...values.props}>
  <div className="mdc-checkbox">
    {values.element}
    <div className="mdc-checkbox__background">
      <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
        <path className="mdc-checkbox__checkmark-path" fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
      </svg>
      <div className="mdc-checkbox__mixedmark"></div>
    </div>
    <div className="mdc-checkbox__ripple"></div>
  </div>
  <label htmlFor="{id}">{values.label}</label>
</tag>

        );
    }
}


@asNode
export class CheckBoxInput extends Component
{
    WANT_FORM_FIELD = true

    prepare_attributes(attrs, default_)
    {
        if (attrs.indeterminate)
        {
            attrs['data-indeterminate'] = 'true';
        }
        attrs.className.push('mdc-checkbox__native--control');
    }

    prepare()
    {
        if (this.element_attributes().disabled)
        {
            this.values.className.push('mdc-checkbox--disabled');
        }
    }

    template_default()
    {
        const values = this.values, tag = values.tag;
        return (

<div className="mdc-touch-target-wrapper">
  <tag className={'mdc-form-field ' + values.className} {...values.props}>
    <div className="mdc-checkbox">
      {values.element}
      <div className="mdc-checkbox__background">
        <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
          <path className="mdc-checkbox__checkmark-path" fill="none"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
        </svg>
        <div className="mdc-checkbox__mixedmark"></div>
      </div>
      <div className="mdc-checkbox__ripple"></div>
    </div>
    <label htmlFor={values.id}>{values.label}</label>
  </tag>
</div>

        );
    }
}
