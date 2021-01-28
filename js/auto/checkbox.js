import { MDCCheckbox } from '@material/checkbox';
import { MDCFormField } from '@material/form-field';

document.addEventListener(
        'DOMContentLoaded',
        function()
        {
            for (let el of document.querySelectorAll('.mdc-checkbox'))
            {
                const checkbox = new MDCCheckbox(el);
                const ff = el.closest('.mdc-form-field');
                if (ff)
                {
                    let formField = new MDCFormField(ff);
                    formField.input = checkbox;
                }
            }
        });
