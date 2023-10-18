// функция для перемешивания элементов массива в случайном порядке 

export const shuffle = (array) => { 

    // currentIndex устанавливается в длину массива, а randomIndex объявляется без значения 

    let currentIndex = array.length, randomIndex; 

   

    while (currentIndex != 0) { 

      // генерирует случайное число от 0 до currentIndex - 1 и присваивает его переменной randomIndex 

      randomIndex = Math.floor(Math.random() * currentIndex); 

      currentIndex--; 

      // перестановка элементов на позициях currentIndex и randomIndex 

      [array[currentIndex], array[randomIndex]] = [ 

        array[randomIndex], array[currentIndex]]; 

    } 

    // возвращает перемешанный массив 

    return array; 

  } 

// функция, которая принимает массив и возвращает новый массив, в котором каждый элемент исходного массива повторяется дважды 

export const duplicateArray = (array) => array.reduce((res, current) => res.concat([current, current]), []); 

 

// функция, в зависимости от сложности создает массив с иконками 

export const createIconsArray = (initialCount) => { 

    // иконки 

    const cardsIcons = [ 

        'compass', 

        'cloud', 

        'play', 

        'bolt', 

        'stop', 

        'cogs', 

        'atom', 

        'basketball-ball' 

    ]; 

 

    switch (initialCount) { 

        // принимаем число из initialCount и создает кол-во иконок 

        case 10: 

            return cardsIcons.slice(0, 5); 

        case 12: 

            return cardsIcons.slice(0, 6); 

        case 14: 

            return cardsIcons.slice(0, 7); 

        case 16: 

            return cardsIcons; 

        default: 

            break; 

    } 

} 