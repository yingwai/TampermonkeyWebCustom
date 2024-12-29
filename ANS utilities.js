// ==UserScript==
// @name         ANS utilities
// @namespace    http://tampermonkey.net/
// @version      2024-10-19
// @description  try to take over the world!
// @author       You
// @match        https://acade.studio/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=acade.studio
// @grant        none
// ==/UserScript==

(function() {
    "use strict";

    document.addEventListener('mousedown', function(event) {
        if (event.target.tagName === 'BUTTON' && event.target.innerText === 'Generate') {
            let pressTimer = setTimeout(() => alert('Save Code!🤖'), 1000);

            event.target.addEventListener('mouseup', () => clearTimeout(pressTimer));
            event.target.addEventListener('mouseleave', () => clearTimeout(pressTimer));
            event.preventDefault();
        }
    });


    // Sticky unlock block
    function updateUnlockBlock() {
        document.querySelectorAll('button').forEach((button) => {
            if (button.innerText === 'Unlock' && button.parentElement) {
                button.parentElement.style.position = 'sticky';
                if (button.parentElement.style.display !== "none") {
                    button.parentElement.style.display = 'inline-block';
                }
            }
        });
    }

    // w100% code mirror
    function updateCodeMirror() {
        document.querySelectorAll('.CodeMirror').forEach((codeMirror) => {
            const parentElement = codeMirror.parentElement;
            if (parentElement) {
                parentElement.style.width = '100%';
                parentElement.parentElement.style.background = '#272822';
            }
        });
    }

    let isPreScripts = false;
    document.addEventListener('keydown', (event) => {
        if (event.altKey && (event.key === 'h' || event.key === 'р')) {
            isPreScripts = !isPreScripts;
            updatePreScript();
        }
    });

    // w100% code mirror
    function updatePreScript() {
        document.querySelectorAll('.simplescript').forEach((preScript) => {
            const parentElement = preScript.parentElement;
            if (parentElement) {
                parentElement.style.zIndex = '100';
                parentElement.style.left = 'unset';
                parentElement.style.right = '10px';
                parentElement.style.visibility = isPreScripts ? 'visible' : 'hidden';
            }
        });
    }

    const observer = new MutationObserver(() => {
        updateUnlockBlock();
        updateCodeMirror();
        updatePreScript();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
})();