import { MDCSnackbar } from '@material/snackbar';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class Snackbar extends Component
{
    WANT_CHILDREN = true
    NODE_PROPS = ['stacked', 'leading']

    prepare()
    {
        if (this.eval(this.props.stacked))
        {
            this.values.className.push('mdc-snackbar--stacked');
        }
        if (this.eval(this.props.leading))
        {
            this.values.className.push('mdc-snackbar--leading');
        }
    }

    componentDidMount()
    {
        this.mdc = new MDCSnackbar(this.el.current);
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<div ref={this.el} className={'mdc-snackbar ' + values.className}
    {...values.props}>
  <Tag role="status" aria-relevant="additions"
      className="mdc-snackbar__surface">
    {values.child}
  </Tag>
</div>

        );
    }
}


Snackbar.Content = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag aria-atomic="false" className={'mdc-snackbar__label ' + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}


Snackbar.Actions = @asNode class extends Component
{
    WANT_CHILDREN = true

    prepare()
    {
        this.context.button_class = ['mdc-snackbar__action'];
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag aria-atomic="true" className={'mdc-snackbar__actions ' + values.className}
    {...values.props}
  {values.child}
</Tag>
        );
    }
}
