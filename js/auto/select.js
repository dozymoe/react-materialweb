import { MDCSelect } from '@material/select';

document.addEventListener(
        'DOMContentLoaded',
        function()
        {
            for (let el of document.querySelectorAll('.mdc-select'))
            {
                new MDCSelect(el);
            }
        });
