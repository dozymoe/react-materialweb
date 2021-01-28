import { MDCSnackbar } from '@material/snackbar';

document.addEventListener(
        'DOMContentLoaded',
        function()
        {
            for (let el of document.querySelectorAll('.mdc-snackbar'))
            {
                new MDCSnackbar(el);
            }
        });
