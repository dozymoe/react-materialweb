import { MDCDataTable } from '@material/data-table';
import React, { Component } from 'react';
//-
import { asNode } from './base.jsx';
import { IconButton } from './button.jsx';


@asNode
export class DataTable extends Component
{
    WANT_CHILDREN = true
    NODE_PROPS = ['name', 'pager', 'page_name', 'row_selectable', 'row_movable']
    DEFAULT_TAG = 'table'

    prepare()
    {
        this.context.name = this.eval(this.props.name) || '';
        this.context.selectable = this.eval(this.props.row_selectable);
        this.context.movable = this.eval(this.props.row_movable);

        let pager = this.eval(this.props.pager);
        if (pager)
        {
            this.values.pagination = this.render_pagination(pager);
        }
    }

    render_pagination(pager)
    {
        let url = new URL(pager.get_full_path());
        let page_name = this.eval(this.props.page_name) || 'page';
        let href, first_kwargs, prev_kwargs, last_kwargs, next_kwargs;
        let extra_kwargs;

        if (pager.has_previous())
        {
            href = new URL(url);
            href.searchParams.set(page_name, 1);
            first_kwargs = {href: href};

            href = new URL(url);
            href.searchParams.set(page_name, pager.previous_page_number());
            prev_kwargs = {href: href};

            extra_kwargs = {};
        }
        else
        {
            first_kwargs = prev_kwargs = {};
            extra_kwargs = {type: 'button', disabled: 'disable'};
        }

        let first_button = <IconButton label="First Page"
                data-first-page="true"
                className="mdc-data-table__pagination-button material-icons"
                {...first_kwargs} {...extra_kwargs}
                >fist_page</IconButton>;
        let prev_button = <IconButton label="Previous Page"
                data-prev-page="true"
                className="mdc-data-table__pagination-button material-icons"
                {...prev_kwargs} {...extra_kwargs}
                >chevron_left</IconButton>;

        if (pager.has_next())
        {
            href = new URL(url);
            href.searchParams.set(page_name, pager.next_page_number());
            next_kwargs = {href: href};

            href = new URL(url);
            href.searchParams.set(page_name, pager.pagination.num_pages);
            last_kwargs = {href: href};

            extra_kwargs = {};
        }
        else
        {
            next_kwargs = last_kwargs = {};
            extra_kwargs = {type: 'button', disabled: 'disable'};
        }

        let next_button = <IconButton label="Next Page"
                data-next-page="true"
                className="mdc-data-table__pagination-button material-icons"
                {...next_kwargs} {...extra_kwargs}
                >chevron_right</IconButton>;
        let last_button = <IconButton label="Last Page"
                data-last-page="true"
                className="mdc-data-table__pagination-button material-icons"
                {...last_kwargs} {...extra_kwargs}
                >last_page</IconButton>;

        let values = {
            page_size: pager.pagination.per_page,
            total_pages: pager.pagination.num_pages,
            total_items: pager.pagination.count,
            start: pager.start_index(),
            end: pager.end_index(),
            first_button: first_button,
            prev_button: prev_button,
            next_button: next_button,
            last_button: last_button,
            label_rows_per_page: "Rows per page",
            id_page_size: this.id + '-pagesize',
        }
        return (

<div className="mdc-data-table__pagination">
  <div className="mdc-data-table__pagination-trailing">
    <div className="mdc-data-table__pagination-rows-per-page">
      <div className="mdc-data-table__pagination-rows-per-page-label">
        {values.label_rows_per_page}
      </div>

      <div className="mdc-select mdc-select--outlined mdc-select--no-label mdc-data-table__pagination-rows-per-page-select">
        <div role="button" aria-haspopup="listbox"
            aria-labelledby={values.id_page_size} tabIndex="0"
            className="mdc-select__anchor">
          <span id={values.id_page_size} className="mdc-select__selected-text">
            {values.page_size}
          </span>
          <span className="mdc-select__dropdown-icon">
            <svg
                className="mdc-select__dropdown-icon-graphic"
                viewBox="7 10 10 5">
              <polygon
                  className="mdc-select__dropdown-icon-inactive"
                  stroke="none"
                  fillRule="evenodd"
                  points="7 10 12 15 17 10">
              </polygon>
              <polygon
                  className="mdc-select__dropdown-icon-active"
                  stroke="none"
                  fillRule="evenodd"
                  points="7 15 12 10 17 15">
              </polygon>
            </svg>
          </span>
          <span className="mdc-notched-outline mdc-notched-outline--notched">
            <span className="mdc-notched-outline__leading"></span>
            <span className="mdc-notched-outline__trailing"></span>
          </span>
        </div>

        <div role="listbox"
            className="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
          <ul className="mdc-list">
            <li aria-selected="true" role="option" data-value="10"
                className="mdc-list-item mdc-list-item--selected">
              <span className="mdc-list-item__text">10</span>
            </li>
            <li className="mdc-list-item" role="option" data-value="25">
              <span className="mdc-list-item__text">25</span>
            </li>
            <li className="mdc-list-item" role="option" data-value="100">
              <span className="mdc-list-item__text">100</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="mdc-data-table__pagination-navigation">
      <div className="mdc-data-table__pagination-total">
        {values.start}‑{values.end} of {values.total_items}
      </div>
      {values.first_button}
      {values.prev_button}
      {values.next_button}
      {values.last_button}
    </div>
  </div>
</div>

        );
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<div className="mdc-data-table">
  <div className="mdc-data-table__table--container">
    <Tag aria-label={values.label}
        className={'mdc-data-table__table ' + values.className}
        {...values.props}>
      {values.child}
    </Tag>
  </div>
  {values.pagination}
</div>

        );
    }
}


DataTable.Head = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'thead'

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}


DataTable.Head.Row = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'tr'

    prepare()
    {
        if (this.context.selectable)
        {
            this.values.select_checkbox = this.render_select();
        }
        this.values.label_toggle_all = "Toggle all rows";
    }

    render_select()
    {
        const values = this.values;
        return (

<th role="columnheader" scope="col"
    className="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox">
  <div className="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox--selected">
    <input type="checkbox" aria-label={values.label_toggle_all}
        className="mdc-checkbox__native-control" />
    <div className="mdc-checkbox__background">
      <svg viewBox="0 0 24 24" className="mdc-checkbox__checkmark">
        <path fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"
            className="mdc-checkbox__checkmark-path" />
      </svg>
      <div className="mdc-checkbox__mixedmark"></div>
    </div>
    <div className="mdc-checkbox__ripple"></div>
  </div>
</th>

        );
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-data-table__header-row ' + values.className}
    {...values.props}>
  {values.select_checkbox}
  {values.child}
</Tag>

        );
    }
}


DataTable.Head.Col = @asNode class extends Component
{
    WANT_CHILDREN = true
    NODE_PROPS = ['type']
    DEFAULT_TAG = 'th'

    prepare()
    {
        let type = this.eval(this.props.type);
        if (type === 'num')
        {
            this.values.className.push('mdc-data-table__header-cell--numeric');
        }
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag role="columnheader" scope="col"
    className={'mdc-data-table__header-cell ' + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}


DataTable.Body = @asNode class extends Component
{
    WANT_CHILDREN = true
    DEFAULT_TAG = 'tbody'

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-data-table__content ' + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}


DataTable.Row = @asNode class extends Component
{
    WANT_CHILDREN = true
    NODE_PROPS = ['value']
    DEFAULT_TAG = 'tr'

    prepare()
    {
        if (this.context.selectable)
        {
            this.context.id_row_header = this.id + '-header';
            this.values.select_checkbox = this.render_select();
        }
    }

    render_select()
    {
        let values = {
            name: this.context.name || '',
            value: this.eval(this.props.value) || '',
            id_row_header: this.context.id_row_header,
        };
        return (

<td className="mdc-data-table__cell mdc-data-table__cell--checkbox">
  <div className="mdc-checkbox mdc-data-table__row-checkbox">
    <input name={values.name} value={values.value} type="checkbox"
        aria-labelledby={values.id_row_header}
        className="mdc-checkbox__native-control" />
    <div className="mdc-checkbox__background">
      <svg viewBox="0 0 24 24" className="mdc-checkbox__checkmark">
        <path fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"
            className="mdc-checkbox__checkmark-path" />
      </svg>
      <div className="mdc-checkbox__mixedmark"></div>
    </div>
    <div className="mdc-checkbox__ripple"></div>
  </div>
</td>

        );
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-data-table__row ' + values.className} {...values.props}>
  {values.select_checkbox}
  {values.child}
</Tag>

        );
    }
}


DataTable.Col = @asNode class extends Component
{
    WANT_CHILDREN = true
    NODE_PROPS = ['type']
    DEFAULT_TAG = 'td'

    prepare()
    {
        let type = this.eval(this.props.type);
        if (type === 'num')
        {
            this.values.className.push('mdc-data-table__header-cell--numeric');
        }
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag className={'mdc-data-table__cell ' + values.className} {...values.props}>
  {values.child}
</Tag>

        );
    }
}


DataTable.ColHeader = @asNode class extends Component
{
    WANT_CHILDREN = true
    NODE_PROPS = ['type']
    DEFAULT_TAG = 'th'

    prepare()
    {
        let type = this.eval(this.props.type);
        if (type === 'num')
        {
            this.values.className.push('mdc-data-table__header-cell--numeric');
        }

        if (this.context.id_row_header)
        {
            this.values.props.id = this.context.id_row_header;
        }
    }

    template_default()
    {
        const values = this.values, Tag = values.tag;
        return (

<Tag scope="row" className={'mdc-data-table__cell ' + values.className}
    {...values.props}>
  {values.child}
</Tag>

        );
    }
}
