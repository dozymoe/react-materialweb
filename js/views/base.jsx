import { isUndefined, omit, uniqueid } from 'lodash';

export function asTag(Component)
{
    class Tag extends Component
    {
        //WANT_CHILDREN = false
        //WANT_FORM_FIELD = false

        constructor(props)
        {
            super(props);

            if (isUndefined(this.MODES))
            {
                this.MODES = [];
            }
            let props = this.NODE_PROPS || [];
            this.NODE_PROPS = ['mode', 'class', 'label', 'bound_field',
                    'onClick', ...props];
        }

        _props()
        {
            return omit(this.props, this.NODE_PROPS);
        }

        child()
        {
            if (this.WANT_CHILDREN)
            {
                return this.props.children;
            }
        }

        label()
        {
            if (this.props.label)
            {
                return this.props.label;
            }
            if (this.WANT_FORM_FIELD)
            {
                return this.props.bound_field.props.label;
            }
            return '';
        }

        element()
        {
            if (! this.WANT_FORM_FIELD) return;

            let field = this.props.bound_field;
            let attrs = [...field.props];

            attrs.className = (field.props.className || '').split(' ')
                    .filter(x => x);
            if (field.props.help_text)
            {
                attrs['aria-control'] = this.id + '-hint';
                attrs['aria-describedby'] = this.id + '-hint';
            }
            if (this.prepare_attributes)
            {
                this.prepare_attributes(attrs, field.props);
            }
            attrs.className = attrs.join(' ');

            return <field {...attrs}/>;
        }

        element_attributes()
        {
            if (! this.WANT_FORM_FIELD) return {};
            return this.props.bound_field.props;
        }

        element_hint()
        {
            return (

<div className="mdc-text-field-helper-line">
  <div id={this.id + '-hint'} aria-hidden="true"
      className="mdc-text-field-helper-text">
    {this.props.bound_field.props.help_text}
  </div>
</div>
            );
        }

        render()
        {
            this.mode = this.props.mode;

            if (this.MODES.length)
            {
                if (! this.mode)
                {
                    this.mode = this.MODES[0];
                }
                else if (this.MODES.indexOf(this.mode) === -1)
                {
                    throw Error("Method " + this.mode + " is not allowed.");
                }
            }
            else
            {
                this.mode = 'default';
            }

            if (this.WANT_FORM_FIELD)
            {
                this.id = this.props.bound_field.props.id;
            }
            else
            {
                this.id = uniqueid();
            }

            let values = this.values = {
                id: this.id,
                label: this.label,
                element: this.element,
                props: this.props,
                className: (this.props.className || '').split(' ')
                    .filter(x => x),
            }
            if (this.prepare_values)
            {
                this.prepare_values(values);
            }
            values.className = values.className.join(' ');

            let html = this.get_template ? this.get_template(values)
                    : this._get_template(values);

            if (this.WANT_FORM_FIELD && this.props.bound_field.props.help_text)
            {
                return <>{html}{this.element_hit()}</>;
            }
            return html;
        }

        _get_template(values)
        {
            const method = 'template_' + this.mode;
            if (!this[method])
            {
                throw Error("Method is misisng: " + method);
            }

            return this[method](values);
        }
    }

    return Tag;
}
