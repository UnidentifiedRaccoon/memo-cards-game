// создание основного меню нашей игры 

// импортируется функция startGame из другого файла startGame.js 

import { startGame } from "./startGame.js"; 

// экспортируется функция createGameMenu для использования в другом месте приложения 

export const createGameMenu = () => { 

    // заголовок h2 - выбор сложности 

    const title = document.createElement('h2'); 

    // наполнение контента на входной странице 

    const gameSection = document.querySelector('.game-section__container'); 

 

    // очистка нашего контейнера gameSection 

    gameSection.innerHTML = ''; 

    // устанавливается текст заголовка 

    title.textContent = 'Выбор сложности'; 

    // добавляется класс к заголовку 

    title.classList.add('game-menu__title'); 

 

    // создается функция, которая принимает аргумент difficult и  

    // возвращает кнопку с классом game-menu__difficult-btn, текстом, указывающим сложность игры 

    const createDifficultButton = (difficult) => { 

        // создание кнопки 

        const button = document.createElement('button'); 

        // чтобы добавить стили 

        button.classList.add('game-menu__difficult-btn'); 

        // текст кнопки (шаблонная кавычка) 

        button.textContent = `${difficult} карт`; 

        // обработчик событий на клик, который вызывает функцию startGame с передачей текущей сложности игры 

        button.addEventListener('click', () => startGame(difficult)) 

 

        return button; 

    } 

 

    // добавляем наши поля на страничку  

    gameSection.append( 

        title, 

        createDifficultButton(10), 

        createDifficultButton(12), 

        createDifficultButton(14), 

        createDifficultButton(16), 

    ) 

} 