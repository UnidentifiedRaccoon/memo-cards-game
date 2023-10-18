import { createGameMenu } from "./gameMenu.js"; 

// Функция showRecordsTable отвечает за отображение таблицы рекордов в игре 

export const showRecordsTable = () => { 

    // Мы получаем записи из локального хранилища и сохраняем их в переменную records 

    const records = JSON.parse(localStorage.getItem('records')) || []; 

    // Мы получаем ссылки на элементы: секцию игры, таблицу игры, кнопку рестарта и элемент для отображения таймера 

    const gameSection = document.querySelector('.game-section__container'); 

    const gameTable = document.querySelector('.game-table'); 

    const restartBtn = document.querySelector('.restart-btn'); 

    const timerDiv = document.querySelector('.timer-div'); 

    // Мы очищаем секцию игры 

    gameSection.innerHTML = ''; 

    // Мы создаем таблицу и заголовки столбцов "Имя" и "Время" 

    const table = document.createElement('table'); 

    const headerRow = document.createElement('tr'); 

    const nameHeader = document.createElement('th'); 

    const timeHeader = document.createElement('th'); 

    nameHeader.textContent = 'Имя'; 

    timeHeader.textContent = 'Время'; 

    headerRow.append(nameHeader, timeHeader); 

 

    // Сортируем массив records по возрастанию времени 

    records.sort((a, b) => a.time - b.time); 

 

    // Мы выбираем первые 10 записей из массива records для отображения в таблице 

    const maxRecordsToShow = 10; 

    const recordsToShow = records.slice(0, maxRecordsToShow);  

    // Мы создаем строки таблицы и ячейки для каждой записи, заполняем их данными и добавляем в таблиц 

    recordsToShow.forEach(record => { 

        const row = document.createElement('tr'); 

        const nameCell = document.createElement('td'); 

        const timeCell = document.createElement('td'); 

 

        nameCell.textContent = record.name; 

        timeCell.textContent = `${record.time} сек.`; 

 

        row.append(nameCell, timeCell); 

        table.append(row); 

    }); 

    // Мы добавляем таблицу, кнопку рестарта и элемент для отображения таймера в секцию игры 

    gameSection.append(table, restartBtn, timerDiv); 

    // Мы добавляем обработчик события на кнопку рестарта,  

    // который вызывает функцию createGameMenu, которая отображает главное меню игры 

    restartBtn.addEventListener('click', () => { 

      createGameMenu(); 

    }); 

  }; 