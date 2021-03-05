import { omit, omitBy, uniqueId } from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
//-
import { ensurePrimitive, ensurePrimitiveProps } from '../misc/mobx.js';


export function asNode(Component)
{
    @observer
    class Node extends Component
    {
        //WANT_CHILDREN = false
        //WANT_FORM_FIELD = false
        //HIDE_FORM_FIELDS = false
        MUST_HAVE_NODE_PROPS = ['mode', 'tag', 'class', 'label', 'bound_field',
                'help_text', 'context']

        CATCH_CLASSNAMES = []
        CATCH_PROPERTIES = []

        constructor(props)
        {
            super(props);
            this.MODES = this.MODES || [];
            this.NODE_PROPS = this.NODE_PROPS || [];
            this.DEFAULT_TAG = this.DEFAULT_TAG || 'div';

            this.el = new React.createRef();

            this.componentWillUnmount = this.componentWillUnmount ||
                    this._componentWillUnmount;
        }

        _props()
        {
            let props = omit(this.props, this.NODE_PROPS);
            props = omit(props, this.MUST_HAVE_NODE_PROPS);
            // Ignore properties with falsy value except empty string.
            props = omitBy(props, (value, key) =>
                    {
                        return value !== '' && !value;
                    });
            return ensurePrimitiveProps(props);
        }

        _child()
        {
            if (this.WANT_CHILDREN)
            {
                return React.Children.map(this.props.children, child =>
                        {
                            if (React.isValidElement(child))
                            {
                                return React.cloneElement(child,
                                        {context: this.context});
                            }
                            return child;
                        });
            }
        }

        _label()
        {
            if (this.props.label)
            {
                return this.props.label;
            }
            return '';
        }

        _element()
        {
            if (! this.WANT_FORM_FIELD) return;

            let field = this.props.bound_field;
            let field_props = ensurePrimitiveProps(field.props);
            let attrs = {...field_props};
            attrs.id = this.id;
            attrs.className = (attrs.className || '').split(' ').filter(x => x);

            let help_text = ensurePrimitive(this.props.help_text);
            if (help_text)
            {
                attrs['aria-controls'] = this.id + '-hint';
                attrs['aria-describedby'] = this.id + '-hint';
            }
            if (this.prepare_attributes)
            {
                this.prepare_attributes(attrs, field_props);
            }
            attrs.className = attrs.className.join(' ');

            if (this.HIDE_FORM_FIELD)
            {
                attrs.type = 'hidden';
            }
            return <field {...attrs}/>;
        }

        element_attributes()
        {
            if (! this.WANT_FORM_FIELD) return {};
            return ensurePrimitiveProps(this.props.bound_field.props);
        }

        element_hint(hint)
        {
            return (

<div className="mdc-text-field-helper-line">
  <div id={this.id + '-hint'} aria-hidden="true"
      className="mdc-text-field-helper-text">
    {hint}
  </div>
</div>
            );
        }

        eval(value)
        {
            return ensurePrimitive(value);
        }

        _componentWillUnmount()
        {
            if (this.mdc)
            {
                this.mdc.destroy();
            }
        }

        render()
        {
            this.context = this.props.context || {};
            this.mode = ensurePrimitive(this.props.mode);

            if (this.MODES.length)
            {
                if (! this.mode)
                {
                    this.mode = this.MODES[0];
                }
                else if (this.MODES.indexOf(this.mode) === -1)
                {
                    throw Error("Mode " + this.mode + " is not allowed.");
                }
            }
            else
            {
                this.mode = 'default';
            }

            if (this.WANT_FORM_FIELD)
            {
                this.id = ensurePrimitive(this.props.bound_field.props.id);
            }
            if (! this.id)
            {
                this.id = uniqueId(this.id_prefix || 'node');
            }

            let values = this.values = {
                id: this.id,
                tag: ensurePrimitive(this.props.tag) || this.DEFAULT_TAG,
                label: this._label(),
                props: this._props(),
                className: (ensurePrimitive(this.props.className) || '')
                    .split(' ').filter(x => x),
            }

            // Parent Tags can set html attributes on their childs.
            for (let ext of this.CATCH_CLASSNAMES)
            {
                if (this.context[ext])
                {
                    values.className.push(...this.context[ext]);
                }
            }
            for (let ext of this.CATCH_PROPERTIES)
            {
                if (this.context[ext])
                {
                    Object.assign(values.props, this.context[ext]);
                }
            }

            if (this.prepare)
            {
                this.prepare();
            }

            values.child = this._child();
            values.element = this._element();
            values.className = values.className.join(' ');

            let html = this.template ? this._template() : this._template();

            let hint = ensurePrimitive(this.props.help_text);
            if (this.WANT_FORM_FIELD && hint)
            {
                return <>{html}{this.element_hint(hint)}</>;
            }
            return html;
        }

        _template()
        {
            const method = 'template_' + this.mode;
            if (!this[method])
            {
                throw Error("Method is misisng: " + method);
            }

            return this[method]();
        }
    }

    return Node;
}
