import CONFIG from './config';


(function(){

    'use strict';

    
    const body = document.querySelector('#body');

    
    let pageData = body.dataset.page;
    let navElem = document.querySelector('#nav-' + pageData);
    navElem.classList.add('is-stay');

})();