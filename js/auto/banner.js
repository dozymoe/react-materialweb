import { MDCBanner } from '@material/banner';

document.addEventListener(
        'DOMContentLoaded',
        function()
        {
            for (let el of document.querySelectorAll('.mdc-banner'))
            {
                new MDCBanner(el);
            }
        });
