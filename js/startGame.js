import { createGameCard } from "./gameCard.js"; 

import { createGameMenu } from "./gameMenu.js"; 

import { createIconsArray, duplicateArray, shuffle } from "./utils.js"; 

import {showRecordsTable} from "./gameRecords.js"; 

// принимает изначальную сложность игры 

export const startGame = (difficult) => { 

    // функция addRecordToTable добавляет новую запись в массив records  

    // и сохраняет его в localStorage, если в localStorage  

    // уже есть данные с ключом records, то новая запись будет добавлена к  

    // существующим данным. Если такого ключа в localStorage еще нет, то он будет создан. 

    const addRecordToTable = (name, time) => { 

        const records = JSON.parse(localStorage.getItem('records')) || []; 

        records.push({ name, time }); 

        localStorage.setItem('records', JSON.stringify(records)); 

      } 

    // переменные, которые будут использоваться для отслеживания состояния игры 

    // let - переменная с блочной областью видимости 

    let firstCard = null; 

    let secondCard = null; 

    let clickable = true; 

    let timer = null; 

    let timeLeft = 60; // время в секундах 

 

    // константы, которые будут использоваться для создания игрового поля и игровых элементов 

    // gameSection получает ссылку на элемент с классом game-section__container 

    const gameSection = document.querySelector('.game-section__container'); 

    // gameTable создает новый элемент div, наша доска 

    const gameTable = document.createElement('div'); 

    // cardsIcons получает массив случайно выбранных значков для карточек игры с font awesome 

    const cardsIcons = createIconsArray(difficult); 

    // duplicatedCardsIcons создает массив, который содержит повторенный дважды массив cardsIcons 

    const duplicatedCardsIcons = duplicateArray(cardsIcons); 

    // restartBtn создает новую кнопку 

    const restartBtn = document.createElement('button'); 

    // элемент для отображения таймера 

    const timerDiv = document.createElement('div'); 

     

    // очищаем содержимое gameSection с помощью innerHTML 

    gameSection.innerHTML = ''; 

    // задаем текст кнопки "Рестарт" с помощью textContent 

    restartBtn.textContent = 'Рестарт'; 

    timerDiv.textContent = `Осталось времени: ${timeLeft} сек.`; 

    // добавляем классы game-table, restart-btn, timer-div 

    gameTable.classList.add('game-table'); 

    restartBtn.classList.add('restart-btn'); 

    timerDiv.classList.add('timer-div'); 

     

    // перемешиваем массив значков для карточек и создаем карточки игры,  

    // используя функцию createGameCard из модуля gameCard.js 

    // затем добавляем игровое поле и кнопку в gameSection 

    // question-circle - название для нашей иконки из библиотеки font awesome 

    shuffle(duplicatedCardsIcons); 

    duplicatedCardsIcons.forEach(icon => gameTable.append(createGameCard('question-circle', icon))); 

    gameSection.append(gameTable, restartBtn, timerDiv); 

     

    // поиск всех элементов с классом game-card и присвоение их в переменную cards 

    const cards = document.querySelectorAll('.game-card'); 

    // добавление слушателя событий на кнопку restartBtn, который вызывает функцию createGameMenu при клике на кнопку 

    restartBtn.addEventListener('click', createGameMenu); 

 

    const countDown = () => { 

        // Мы уменьшаем значение переменной timeLeft на 1 

        timeLeft--; 

        // Мы обновляем текст в элементе timerDiv, выводя количество оставшегося времени в секундах 

        timerDiv.textContent = `Осталось времени: ${timeLeft} сек.`; 

 

        if (timeLeft === 0) { 

            // запускаем обработчик клика на кнопке restartBtn, чтобы игра перезапустилась 

            restartBtn.click();  

            // останавливаем таймер 

            clearInterval(timer);  

        } 

    } 

 

    // запускаем таймер 

    timer = setInterval(countDown, 1000); 

 

    // Для каждой карточки в массиве cards устанавливается обработчик клика.  

    // Обработчик принимает два аргумента: card - текущая карточка и index - индекс текущей карточки в массиве 

    cards.forEach((card, index) => card.addEventListener('click', () => { 

        // Проверяем, можно ли кликнуть на карточку. Переменная clickable равна true, если можно кликать на карточки,  

        // иначе равна false. Если кликнута уже угаданная карточка, то клик игнорируется 

        if (clickable == true && !card.classList.contains('successfully')) { 

            // Добавляем на текущую карточку класс flip, чтобы она повернулась 

            card.classList.add('flip'); 

            // Если это первая карточка, которую мы открываем, то сохраняем ее индекс в переменную firstCard 

            if (firstCard == null) { 

                firstCard = index; 

            }   

            // Если это вторая карточка, которую мы открываем, и ее индекс не равен индексу первой карточки,  

            // то сохраняем ее индекс в переменную secondCard и устанавливаем clickable в false,  

            // чтобы игрок не мог открыть больше одной карточки за ход 

            else { 

                if (index != firstCard) { 

                    secondCard = index; 

                    clickable = false; 

                } 

            } 

            // Если открыты две карточки, проверяем, что индексы первой и второй карточек не равны null и первый != второму 

            if (firstCard != null && secondCard != null && firstCard != secondCard) { 

                // Если классы первой и второй карточек совпадают, значит, игрок угадал пару 

                if ( 

                    cards[firstCard].firstElementChild.className === 

                    cards[secondCard].firstElementChild.className 

                ) { 

                    // Запускаем задержку в полсекунды, чтобы игрок мог увидеть открытые карточки 

                    setTimeout(() => { 

                        // Добавляем класс successfully на открытые карточки, чтобы показать, что игрок угадал пару 

                        cards[firstCard].classList.add('successfully'); 

                        cards[secondCard].classList.add('successfully'); 

                        // Сбрасываем значения переменных firstCard и secondCard в null  

                        // и устанавливаем clickable в true, чтобы игрок мог открыть новую пару карточек 

                        firstCard = null; 

                        secondCard = null; 

                        clickable = true; 

                    }, 500); 

                } else { 

                    // Если классы первой и второй карточек не совпадают, то через полсекунды закрываем обе карточки 

                    setTimeout(() => { 

                        cards[firstCard].classList.remove('flip'); 

                        cards[secondCard].classList.remove('flip'); 

 

                        firstCard = null; 

                        secondCard = null; 

                        clickable = true; 

                    }, 500); 

                } 

            } 

            // данный код проверяет, находятся ли все элементы массива cards в состоянии "перевернутости" 

            if (Array.from(cards).every(card => card.className.includes('flip'))) { 

                clearInterval(timer); // останавливаем таймер, если все карты открыты 

                // присваиваем переменной timer значение null, чтобы предотвратить дальнейшие вызовы функции countDown() 

                timer = null; 

                // Вычисляем общее время игры, вычитая время, оставшееся до конца игры, из 60 секунд 

                const totalTime = 60 - timeLeft; 

                // Получаем массив рекордов из локального хранилища браузера.  

                // Если в хранилище нет рекордов, то создаем пустой массив 

                const records = JSON.parse(localStorage.getItem('records')) || []; 

                // Проверяем, является ли текущее время игры новым рекордом.  

                // Если у нас уже есть 1000000 рекордов, то мы должны проверить,  

                // превышает ли текущее время игры наименьшее время в таблице рекордов.  

                // Если да, то мы можем добавить новую запись в таблицу рекордов и отобразить ее на странице. 

                const isRecord = records.length < 1000000 || totalTime < records[records.length - 1].time; 

                // Если текущее время игры является новым рекордом, то мы показываем модальное окно  

                // с просьбой ввести имя игрока. Затем мы вызываем функцию addRecordToTable(),  

                // чтобы добавить новую запись в таблицу рекордов, и функцию showRecordsTable(),  

                // чтобы обновить видимость таблицы рекордов на странице 

                if (isRecord) { 

                  const name = prompt('Поздравляем, вы попали в таблицу рекордов! Введите ваше имя:'); 

                  addRecordToTable(name, totalTime); 

                  showRecordsTable(); 

                } 

              } 

        } 

    })); 

} 