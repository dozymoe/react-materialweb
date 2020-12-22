import { MDCDrawer } from '@material/drawer';

document.addEventListener(
        'DOMContentLoaded',
        function()
        {
            for (let el of document.querySelectorAll('.mdc-drawer'))
            {
                new MDCDrawer.attachTo(el);
            }
        });
