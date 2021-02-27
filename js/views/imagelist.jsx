import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';


@asNode
export class ImageList extends Component
{
    WANT_CHILDREN = true
    MODES = ['default', 'masonry']
    DEFAULT_TAG = 'ul'

    prepare()
    {
        if (this.mode === 'masonry')
        {
            this.values.className.push('mdc-image-list--masonry');
        }

        // Send this to ListItem
        this.context.list_mode = this.mode;
    }

    template()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-image-list ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}

ImageList.Item = @asNode class extends Component
{
    WANT_CHILDREN = true
    NODE_PROPS = ('image', 'reversed')
    DEFAULT_TAG = 'li'

    prepare()
    {
        this.values.image = this.eval(this.props.image);
        this.values.reverse = this.eval(this.props.reversed);
    }

    template()
    {
        const values = this.values, Tag = values.tag;

        // From ImageList
        let mode = this.context.list_mode;

        let part1, part2;
        if (values.image)
        {
            if (mode === 'masonry')
            {
                part1 = this.template_image_masonry();
            }
            else
            {
                part1 = this.template_image_default();
            }
        }
        part2 = (

<div className="mdc-image-list__supporting">
  <div className="mdc-image-list__label">
    {values.child}
  </div>
</div>
        );

        return (

<Tag className={'mdc-image-list__item ' + values.className}>
  {values.reverse ? {part2}{part1} : {part1}{part2}}
</Tag>

        );
    }

    template_image_default()
    {
        const values = this.values;
        return (

<div className="mdc-image-list__image-aspect-container">
  <img className="mdc-image-list__image" src={values.image} {...values.props}/>
</div>

        );
    }

    template_image_masonry()
    {
        const values = this.values;
        return (

<img className="mdc-image-list__image" src={values.image} {...values.props}/>

        );
    }
}
