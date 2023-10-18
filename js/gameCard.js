// объявление функции createGameCard, которая принимает два аргумента:  

// defaultIcon (иконка по умолчанию) и flippedCardIcon (иконка, отображающаяся на перевернутой карточке) 

export const createGameCard = (defaultIcon, flippedCardIcon) => { 

    // создание нового элемента div и присвоение его переменной card 

    const card = document.createElement('div'); 

    // добавление класса game-card к элементу div 

    card.classList.add('game-card'); 

 

    // создание нового элемента i и присвоение его переменной notFlippedCardI 

    // i - тег для создания иконок 

    const notFlippedCardI = document.createElement('i'); 

    // создание нового элемента i и присвоение его переменной flippedCardI 

    const flippedCardI = document.createElement('i'); 

 

    // 'fa' 'question-circle' - классы из библиотеки иконок fontawesome 

    // добавление классов fa и fa-${defaultIcon} к элементу i,  

    // который будет отображаться на карточке, когда она не будет перевернута 

    notFlippedCardI.classList.add('fa', `fa-${defaultIcon}`); 

    // ..., когда она будет перевернута 

    flippedCardI.classList.add('fa', `fa-${flippedCardIcon}`); 

    // добавление дочерних элементов flippedCardI и notFlippedCardI в элемент card 

    card.append(flippedCardI, notFlippedCardI); 

    // возврат созданной карточки в виде элемента div 

    return card; 

} 