//ОБращение и Получение данных из тэгов в DOM элементах
let name = document.querySelector('.form_name');
let form_btn_add = document.querySelector('.form_btn_add');
let form_btn_del = document.querySelector('.form_btn_del');
let form = document.querySelector('.form');
let list = document.querySelector('.list');
let form_btn_find = document.querySelector('.form_btn_find');
let form_find = document.querySelector('.form_find');

//const myStorage = window.localStorage;//Доступ к хранению данных

/*---Data Block---*/
//---Блок данных, инициализируем ключевое слово let (без данных)
let setText = '';
// ---Объявляем массив,для сохранения данных
let arrData = [
    {id:0, value: 'vania'},
    {id:1, value: 'sasha'},
    {id:2, value: 'alena'}
];
let id = 3;
let inputFindText = '';
//let arrData = JSON.parse(myStorage.getItem('taskSaver')) || []
let filterData = arrData; // Присваиваем массив переменной

/*---Print Data---*/
//---Объявляем функцию для определения данных при воде в Input
const getPrint = (event) => {setText = event.target.value};//---Обращение к конкретному элементу, на котором произошло событие
const getFind = (event) => {inputFindText = event.target.value};//--Фильтрация по элементам

//----Объявляем функцию для записи данных в массив с конца (пушшим массив)
const changePush = (data, text) => {
    if (text) {//----Проверка ввода данных, если заполнено,то true иначе false or error
        data.push({id: id++, value:text, edit: false})//Записываем данные в конец массива
        console.log(text)
    } else {
        console.log('error');//иначе Ошибка
    }
    addTasks();
   findTasks(arrData, inputFindText)
};

/*---Отрисовывка элементов списка---*/
//Оъявляем функцию для создания списка
const addTasks = () => {
    list.innerHTML = '';
   // arrData.forEach((item) => createElem(item))
    if(findTasks.length){
        filterData.forEach(item => {
            createElem(item)
        })} else {
    arrData.forEach(item => {
        createElem(item)
    })
}
   //myStorage.setItem('taskSaver', JSON.stringify(arrData));
}

//-----Создаем элементы списка
const createElem = (elem) => {
    let li = document.createElement('li');
    li.classList.add('list__li')// Присваиваем переменной создание первого элемента списка
    let buttonRemove = document.createElement('button');
    let buttonEdit = document.createElement('button');
    let inpt = null;
    let chkBox = document.createElement('checkbox');
    buttonRemove.addEventListener('click', () => delTasks(elem.id));
    buttonRemove.innerHTML = 'delete element';
    buttonRemove.classList.add('buttonRemove');
    buttonEdit.addEventListener('click', () => editTasks(elem.id));
    buttonEdit.innerHTML = 'edit';
    buttonEdit.classList.add('buttonEdit')
    chkBox.addEventListener('click', () => editTasks(elem.id));
    if (elem.edit) {
        inpt = document.createElement('input');
        inpt.classList.add('list__inp')
        inpt.value = elem.value;// Передаем в инпут строку
        buttonEdit.innerHTML = 'save';
        inpt.addEventListener('keyup', (event) => saveTask(elem.id, event.target.value));
    } else {
        inpt = document.createElement('span');
        inpt.innerHTML = elem.value;
    }
    list.append(chkBox);
    list.append(inpt);
    list.append(buttonEdit);
    list.append(buttonRemove);
    //inpt.innerHTML = elem.value;
    list.append(li);// Выводит список элементов

    /*---style element---*/
//     buttonEdit.style.cssText = `
//     width: 130px;
//     height: 30px;
//     background: #ffc107;
//     border-radius: 5px;
// `
  //   buttonRemove.style.cssText = `
  //   width: 120px;
  //   height: 30px;
  //   background: #ff5722;
  //   border-radius: 3px;
  // `
  //   inpt.style.cssText = `
  //   width: 120px;
  //   height: 25px;
  //   border-radius: 5px;
  //   `
// li.style.padding = '10px';
}


// -----Фильтрация----
const findTasks = (arr, filterText) => {
   filterData = arr.filter((item) => item.value.includes(filterText));//Фильтрация элементов
    console.log(filterData);
    addTasks();
}


//-------Удаление элементов списка-----
const delTasks = (id) => {
    let findId = arrData.findIndex((item) => item.id === id);
    arrData.splice(findId, 1);
    addTasks();
    findTasks(arrData, inputFindText);
}

//-----Редактирования
const editTasks = (id) => {
    let findId = arrData.findIndex((item) => item.id === id);
        if(arrData[findId].edit) {
            arrData[findId].edit = false;
        } else {
            arrData[findId].edit = true;
        }
addTasks()
   findTasks(arrData, inputFindText);
}

//---Сохранения результатов редактирования
const saveTask = (id, text) => {
    let findId = arrData.findIndex((item) => item.id === id);
    arrData[findId].value = text;
   findTasks(arrData, inputFindText);
}

//-----Удаления всех элементов
const delAll = (id) => {
    arrData.findIndex((item) => item.id === id);
    arrData.splice(0, 100);
    addTasks();
   findTasks(arrData, inputFindText);
}


addTasks();

/*---Block Listener*/
//---События---
name.addEventListener('keyup', getPrint); //--Добавляем события при вводе в строке Input
form_btn_add.addEventListener('click', () => changePush(arrData, setText));  //--Добавляем событие на клик кнопки
form_btn_del.addEventListener('click', delAll);//--Добавляем событие на клик кнопки
form_btn_find.addEventListener('click',() => findTasks(arrData, inputFindText));
form_find.addEventListener('keyup', getFind);


/*---style block----*/
// form.style.cssText = `
//     margin: 20px;
//     padding: 21px;
//     border-radius: 10px;
//     box-shadow: 2px 2px 36px 0px;
//     width: 27em;
// `
// name.style.cssText = `
//      width: 150px;
//     height: 25px;
//     border-radius: 5px;
// `
// form_find.style.cssText = `
//      width: 150px;
//     height: 25px;
//     border-radius: 5px;
//   `
// form_btn_add.style.cssText = `
//     width: 130px;
//     height: 30px;
//     background: #adadad;
//     border-radius: 5px;
// `
// form_btn_del.style.cssText = `
//     width: 130px;
//     height: 30px;
//     background: #ff3333;
//     border-radius: 5px;
// `
// form_btn_find.style.cssText = `
//     width: 130px;
//     height: 30px;
//     background: #ffeb3b;
//     border-radius: 5px;
// `
// list.style.listStyle = 'none';
