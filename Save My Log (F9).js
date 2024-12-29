// ==UserScript==
// @name         Save My Log (F9)
// @namespace    http://tampermonkey.net/
// @version      2024-10-25
// @description  Press F9 for open modal
// @author       You
// @match        https://acade.studio/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=acade.studio
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('keydown', (event) => {
        if (event.key === 'F9') {
            const userResponse = prompt("0 - фиксирует вывод средств\n1 - фиксирует баланс и штрафы");

            if (userResponse !== null) {
                if (userResponse.toLowerCase() === '0') {
                    saveWithdrawToLocalStorage();
                } else if (userResponse.toLowerCase() === '1') {
                    saveBalanceToLocalStorage();
                }
            }
        }
    });

    function saveWithdrawToLocalStorage() {
        const balance = document.querySelectorAll('span')[5].textContent.trim().split(" ")[1];

        const logEntry = {
            date: new Date().toLocaleString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            balance: balance,
            pay: balance * 0.8
        };

        // Получаем текущий лог или создаем новый, если его нет
        const log_withdraw = JSON.parse(localStorage.getItem('log_withdraw')) || [];
        log_withdraw.unshift(logEntry);

        localStorage.setItem('log_withdraw', JSON.stringify(log_withdraw));
    }

    function saveBalanceToLocalStorage() {
        const spans = document.querySelectorAll('span');
        const balance = [];

        balance.push(spans[2].textContent.trim());
        balance.push(spans[3].textContent.trim());
        balance.push(spans[7].textContent.trim());

        const logEntry = {
            date: new Date().toLocaleString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            balance: balance.join(' ')
        };

        // Получаем текущий лог или создаем новый, если его нет
        const log_balance = JSON.parse(localStorage.getItem('log_balance')) || [];
        log_balance.unshift(logEntry);

        localStorage.setItem('log_balance', JSON.stringify(log_balance));
    }
})();