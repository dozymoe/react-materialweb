import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class List extends Component
{
    WANT_CHILDREN = true
    MODES = ['one_line', 'two_line']
    DEFAULT_TAG = 'ul'

    CATCH_PROPERTIES = ['list_props']

    prepare()
    {
        if (this.mode === 'two_line')
        {
            this.values.className.push('mdc-list--two-lines');
        }
    }

    componentDidMount()
    {
        this.mdc = new MDCList(this.el.current);
    }

    template()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag ref={this.el} className={'mdc-list ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}


List.Item = @asNode class extends Component
{
    WANT_CHILDREN = true
    NODE_PROPS = ['activated']
    DEFAULT_TAG = 'li'

    CATCH_PROPERTIES = ['list_item_props']

    prepare()
    {
        let activated = this.eval(this.props.activated);
        if (activated)
        {
            this.values.className.push('mdc-list-item--activated');
        }
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-list-item ' + values.className} {...values.props}>
  <span className="mdc-list-item__ripple"></span>
  {values.child}
</Tag>

        );
    }
}

List.Image = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'span'

    CATCH_CLASSNAMES = ['list_image_class']

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag aria-hidden="true" className={'mdc-list-item__graphic ' + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}

List.Text = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'span'

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-list-item__text ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}

List.LinePrimary = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'span'

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-list-item__primary-text ' + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}

List.LineSecondary = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'span'

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-list-item__secondary-text ' + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}

List.Group = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'h3'

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<div className={'mdc-list-group ' + values.className} {...values.props}>
  <Tag className="mdc-list-group__subheader">{values.label}</Tag>
  {values.child}
</div>

        );
    }
}

List.Divider = @asNode class extends Component
{
    DEFAULT_TAG = 'li'

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag role="separator" className={'mdc-list-divider ' + values.className}
    {...values.props} />

        );
    }
}


@asNode
export class SelectList extends Component
{
    WANT_CHILDREN = true
    MODES = ['list', 'radio', 'checkbox']
    DEFAULT_TAG = 'ul'

    prepare()
    {
        if (this.mode === 'radio')
        {
            this.values.props['role'] = 'radiogroup';
        }
        else if (this.mode === 'checkbox')
        {
            this.values.props['role'] = 'group';
        }
        else
        {
            this.values.props['role'] = 'listbox';
        }

        if (this.values.label)
        {
            this.values.props['aria-label'] = this.values.label;
        }

        this.context.list_mode = this.mode;
    }

    componentDidMount()
    {
        this.mdc = new MDCList(this.el.current);
    }

    template()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag ref={this.el} className={'mdc-list ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}

SelectList.Item = @asNode class extends Component
{
    WANT_CHILDREN = true
    NODE_PROPS = ['selected', 'name', 'value']
    DEFAULT_TAG = 'li'

    prepare()
    {
        // Late declaration of `this.mode`.
        this.mode = this.context.list_mode || 'list';

        let selected = this.eval(this.props.selected);
        this.values.input_props = {};

        if (selected)
        {
            this.values.props['tabindex'] = '0';

            if (mode === 'radio' || mode === 'checkbox')
            {
                this.values.props['aria-checked'] = 'true';
                this.values.input_props['checked'] = 'checked';
            }
            else
            {
                this.values.props['aria-selected'] = 'true';
                this.values.className.push('mdc-list-item--selected');
            }
        }
        else
        {
            if (mode === 'radio' || mode === 'checkbox')
            {
                this.values.props['aria-checked'] = 'false';
            }
            else
            {
                this.values.props['aria-selected'] = 'false';
            }
        }

        this.values.name = this.eval(this.props.name);
        this.values.value = this.eval(this.props.value);
    }

    template_list()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag role="option" className={'mdc-list-item ' + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }

    template_radio()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag role="radio" className={'mdc-list-item ' + values.className}
    {...values.props}>
  <span className="mdc-list-item__ripple"></span>
  <span className="mdc-list-item__graphic">
    <div className="mdc-radio">
      <input name={values.name} value={values.value} type="radio"
          id={values.id} className="mdc-radio__native-control"
          {...values.input_props} />
      <div className="mdc-radio__background">
        <div className="mdc-radio__outer-circle"></div>
        <div className="mdc-radio__inner-circle"></div>
      </div>
    </div>
  </span>
  <label htmlFor={values.id} className="mdc-list-item__text">
    {values.label}
  </label>
</Tag>

        );
    }

    template_checkbox()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag role="checkbox" className={'mdc-list-item ' + values.className}
      {...values.props}>
  <span className="mdc-list-item__ripple"></span>
  <span className="mdc-list-item__graphic">
    <div className="mdc-checkbox">
      <input name={values.name} value={values.value} type="checkbox"
          id={values.id} className="mdc-checkbox__native-control"
          {...values.input_props} />
      <div className="mdc-checkbox__background">
        <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
          <path className="mdc-checkbox__checkmark-path" fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
        </svg>
        <div className="mdc-checkbox__mixedmark"></div>
      </div>
    </div>
  </span>
  <label htmlFor={values.id} className="mdc-list-item__text">
    {values.label}
  </label>
</Tag>

        );
    }
}
