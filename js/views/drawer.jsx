import { MDCDrawer } from '@material/drawer';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class Drawer extends Component
{
    WANT_CHILDREN = true
    MODES = ['standard', 'modal', 'dismissible']
    DEFAULT_TAG = 'aside'

    template_standard()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-drawer ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }

    template_modal()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-drawer mdc-drawer--modal ' + values.className}
    {...values.props}>
  {values.child}
</Tag>
<div className="mdc-drawer-scrim"></div>

        );
    }

    template_dismissible()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-drawer mdc-drawer--dismissible ' + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}


Drawer.Header = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-drawer__header ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}


Drawer.Title = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'h3'

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-drawer__title ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}


Drawer.SubTitle = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'h6'

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-drawer__subtitle ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}


Drawer.Content = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'nav'

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<div className="mdc-drawer__content">
  <Tag className={'mdc-list ' + values.className} {...values.props}>
    {values.child}
  </Tag>
</div>

        );
    }
}


Drawer.AppContent = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-drawer-app-content ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}
