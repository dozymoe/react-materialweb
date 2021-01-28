import { MDCSelect } from '@material/select';
import { observable } from 'mobx';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class Select extends Component
{
    WANT_CHILDREN = true
    WANT_FORM_FIELD = true
    HIDE_FORM_FIELD = true
    MODES = ['filled', 'outlined']
    NODE_PROPS = ['value', 'required', 'disabled', 'onChange']
    DEFAULT_TAG = <ul/>

    @observable selected_text = ''

    prepare_attributes(attrs, default_)
    {
        if (this.values.disabled)
        {
            attrs.disabled = 'true';
        }
        if (this.values.required)
        {
            attrs.required = 'true';
        }
    }

    prepare()
    {
        this.values.value = this.eval(this.props.value);
        this.context.list_value = this.values.value;

        this.values.disabled = this.eval(this.props.disabled);
        this.values.required = this.eval(this.props.required);

        this.values.anchor_props = {};

        if (this.values.disabled)
        {
            this.values.className.push('mdc-select--disabled');
            this.values.anchor_props['aria-disabled'] = 'true';
        }
        if (this.values.required)
        {
            this.values.className.push('mdc-select--required');
            this.values.anchor_props['aria-required'] = 'true';
        }
        if (!this.values.label)
        {
            this.values.className.push('mdc-select--no-label');
        }
    }

    componentDidMount()
    {
        this.updateLabel(this.props.value || '');
        this.mdc = new MDCSelect(this.el.current);
        this.mdc.listen('MDCSelect:change', () =>
                {
                    this.updateLabel(this.mdc.value);
                    if (this.props.onChange)
                    {
                        this.props.onChange(this.mdc.value, el);
                    }
                });
    }

    template_filled()
    {
        const values = this.values, tag = values.tag;
        return (

<div ref={this.el}
    className={'mdc-select mdc-select--filled ' + values.className}
    {...values.props}>
  {values.element}
  <div role="button" aria-haspopup="listbox" aria-expanded="false"
      aria-labelledby={values.id + '-label ' + values.id + '-selected-text'}
      className="mdc-select__anchor"
      {...values.anchor_props}>
    <span className="mdc-select__ripple" />
    {values.label ?
      <span id={values.id + '-label'} className="mdc-floating-label">
        {values.label}
      </span> :null}
    <span className="mdc-select__selected-text-container">
      <span id={values.id + '-selected-text'}
          className="mdc-select__selected-text">
        {this.selected_text}
      </span>
    </span>
    {this.template_dropdown_icon()}
    <span className="mdc-line-ripple" />
  </div>

  <div className="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
    <tag className="mdc-list" role="listbox" aria-label={values.label}>
      {values.child}
    </tag>
  </div>
</div>

        );
    }

    template_outlined()
    {
        const values = this.values, tag = values.tag;
        return (

<div ref={this.el}
    className={'mdc-select mdc-select--outlined ' + values.className}
    {...values.props}>
  {values.element}
  <div role="button" aria-haspopup="listbox" aria-expanded="false"
      aria-labelledby={values.id + '-label ' + values.id + '-selected-text'}
      className="mdc-select__anchor"
      {...values.anchor_props}>
    <span className="mdc-notched-outline">
      <span className="mdc-notched-outline__leading" />
      {values.label ?
        <span className="mdc-notched-outline__notch">
          <span id={values.id + '-label'} className="mdc-floating-label">
            {values.label}
          </span>
        </span> :null}
      <span className="mdc-notched-outline__trailing" />
    </span>
    <span className="mdc-select__selected-text-container">
      <span id={values.id + '-selected-text'}
          className="mdc-select__selected-text">
        {this.selected_text}
      </span>
    </span>
    {this.template_dropdown_icon()}
  </div>

  <div className={'mdc-select__menu mdc-menu mdc-menu-surface' +
        ' mdc-menu-surface--fullwidth'}>
    <tag role="listbox" className="mdc-list">
      {values.child}
    </tag>
  </div>
</div>

        );
    }

    template_dropdown_icon()
    {
        return (

<span className="mdc-select__dropdown-icon">
  <svg viewBox="7 10 10 5"
      className="mdc-select__dropdown-icon-graphic">
    <polygon points="7 10 12 15 17 10" stroke="none"
        fillRule="evenodd"
        className="mdc-select__dropdown-icon-inactive" />
    <polygon points="7 15 12 10 17 15" stroke="none"
          fillRule="evenodd"
          className="mdc-select__dropdown-icon-active" />
  </svg>
</span>

        );
    }

    updateLabel(value)
    {
        let el = this.el.current.querySelector('.mdc-list-item [data-value="'
                + value + '"] .mdc-list-item__text');
        this.selected_text = el ? el.textContent : '';
    }
}

Select.Item = @asNode class extends Component
{
    WANT_CHILDREN = true
    NODE_PROPS = ['value', 'disabled']
    DEFAULT_TAG = <li/>

    prepare()
    {
        this.values.value = this.eval(this.props.value);
        this.values.selected = this.values.value === this.context.list_value;
        if (this.values.selected)
        {
            this.values.className.push('mdc-list-item--selected');
            this.values.props['aria-selected'] = 'true';
        }

        this.values.disabled = this.eval(this.props.disabled);
        if (this.values.disabled)
        {
            this.values.className.push('mdc-list-item--disabled');
            this.values.props['aria-disabled'] = 'true';
        }
    }

    template_default()
    {
        const values = this.values, tag = values.tag;
        return (

<tag role="option" data-value={values.value || ''}
    className={'mdc-list-item ' + values.className} {...values.props}>
  <span className="mdc-list-item__ripple" />
  <span className="mdc-list-item__text">
    {values.child}
  </span>
</tag>

        );
    }
}
