import { MDCMenu } from '@material/menu';

document.addEventListener(
        'DOMContentLoaded',
        function()
        {
            for (let el of document.querySelectorAll('.mdc-menu'))
            {
                new MDCMenu(el);
            }
        });
