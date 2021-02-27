import { MDCDialog } from '@material/dialog';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class Dialog extends Component
{
    WANT_CHILDREN = true
    NODE_PROPS = ['visible', 'onOpen', 'onClose', 'outsideElement']

    prepare()
    {
        this.context.dialogId = this.values.id;
    }

    componentDidMount()
    {
        this.mdc = new MDCDialog(this.el.current);

        if (this.props.onOpen)
        {
            this.mdc.listen('MDCDialog:opened', this.props.onOpen);
        }
        if (this.props.onClose)
        {
            this.mdc.listen('MDCDialog:closing', this.props.onClose);
        }
        if (this.props.outsideElement)
        {
            this.mdc.listen('MDCDialog:opened', () =>
                    {
                        this.props.outsideElement.setAttribute('aria-hidden',
                                'true');
                    });
            this.mdc.listen('MDCDialog:closing', () =>
                    {
                        this.props.outsideElement.removeAttribute(
                                'aria-hidden');
                    });
        }

        if (this.props.visible)
        {
            this.mdc.open();
        }
    }

    componentDidUpdate(old)
    {
        if (this.props.visible !== old.visible)
        {
            if (this.props.visible)
            {
                this.mdc.open();
            }
            else
            {
                this.mdc.close();
            }
        }
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag ref={this.el} id={values.id} className={'mdc-dialog ' + values.className}
    {...values.props}>
  <div className="mdc-dialog__container">
    <div role="alertdialog" aria-modal="true"
        aria-labelledby={values.id + '-title'}
        aria-describedby={values.id + '-content'}
        className="mdc-dialog__surface">
      {values.child}
    </div>
  </div>
  <div className="mdc-dialog__scrim" />
</Tag>

        );
    }
}

Dialog.Title = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'h2'

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag id={this.context.dialogId + '-title'}
    className={'mdc-dialog__title ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}

Dialog.Content = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag id={this.context.dialogId + '-content'}
    className={'mdc-dialog__content ' + values.className} {...values.props}>
  {values.child}
</Tag>
        );
    }
}

Dialog.Actions = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-dialog__actions ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }

    static CANCEL = 'cancel'
    static SUBMIT = 'submit'
}

Dialog.Button = @asNode class extends Component
{
    WANT_CHILDREN = true
    NODE_PROPS = ['action']
    DEFAULT_TAG = 'button'

    prepare()
    {
        let action = this.eval(this.props.action);
        if (action)
        {
            this.values.props['data-mdc-dialog-action'] = action;
        }
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-dialog__button ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}
