import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class Card extends Component
{
    WANT_CHILDREN = true
    MODES = ['elevated', 'outlined']

    prepare()
    {
        if (this.mode === 'elevated')
        {
            this.values.className.push('mdc-card--elevated');
        }
        else if (this.mode === 'outlined')
        {
            this.values.className.push('mdc-card--outlined');
        }
    }

    template()
    {
        const values = this.values, tag = values.tag;
        return (

<tag className={'mdc-card ' + values.className} {...values.props}>
  {values.child}
</tag>

        );
    }
}


Card.PrimaryAction = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, tag = values.tag;
        return (

<tag tabindex="0" className={'mdc-card__primary-action ' + values.className}
    {...values.props}>
  {values.child}
</tag>

        );
    }
}


Card.Media = @asNode class extends Component
{
    WANT_CHILDREN = true
    MODES = ['default', 'square']

    prepare()
    {
        if (this.mode === 'square')
        {
            this.values.className.push('mdc-card__media--square');
        }
    }

    template()
    {
        const values = this.values, tag = values.tag;
        return (

<tag className={'mdc-card__media ' + values.className} {...values.props}>
  <div className="mdc-card__media-content">
    {values.child}
  </div>
</tag>

        );
    }
}


Card.Actions = @asNode class extends Component
{
    WANT_CHILDREN = true
    MODES = ['default', 'full_bleed']

    prepare()
    {
        if (this.mode === 'full_bleed')
        {
            this.values.className.push('mdc-card__actions--full-bleed');
        }

        this.context.button_class = ['mdc-card__action',
                'mdc-card__action--button'];
        this.context.button_icon_class = ['mdc-card__action',
                'mdc-card__action--icon'];
    }

    template()
    {
        const values = this.values, tag = values.tag;
        return (

<tag className={'mdc-card__actions ' + values.className} {...values.props}>
  {values.child}
</tag>

        );
    }
}


Card.Content = @asNode class extends Component
{
    WANT_CHILDREN = true

    template_default()
    {
        const values = this.values, tag = values.tag;
        return (

<tag className={'mdc-card__content ' + values.className} {...values.props}>
  {values.child}
</tag>

        );
    }
}
