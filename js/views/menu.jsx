import { MDCMenu } from '@material/menu';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class Menu extends Component
{
    WANT_CHILDREN = true

    componentDidMount()
    {
        this.mdc = new MDCMenu(this.el.current);
    }

    prepare()
    {
        this.context.list_props = {
            role: 'menu',
            'aria-hidden': 'true',
            'aria-orientation': 'vertical',
            'tabindex': '-1',
        };
        this.context.list_item_props = {
            role: 'menuitem',
        };
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag ref={this.el} className={'mdc-menu mdc-menu-surface ' + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}

Menu.Anchor = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-menu-surface--anchor ' + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}

Menu.Group = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'ul'

    prepare()
    {
        this.context.list_image_class = ['mdc-menu__selection-group-icon'];
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<li>
  <Tag className={'mdc-menu__selection-group ' + values.className}
      {...values.props}>
    {values.child}
  </Tag>
</li>

        );
    }
}
