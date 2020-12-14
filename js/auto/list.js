import { MDCList } from '@material/list';

document.addEventListener(
        'DOMContentLoaded',
        function()
        {
            for (let el of document.querySelectorAll('.mdc-list'))
            {
                new MDCList(el);
            }
        });
