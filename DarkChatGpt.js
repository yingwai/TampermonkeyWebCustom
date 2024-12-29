// ==UserScript==
// @name         DarkChatGpt
// @namespace    http://tampermonkey.net/
// @version      2024-10-24
// @description  try to take over the world!
// @author       You
// @match        https://chatgpt.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function setTheme() {
        localStorage.setItem('theme', 'dark');
    }

    // re-run after AJAX refreshes
    const observer = new MutationObserver(setTheme);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
})();