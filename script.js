window.addEventListener("DOMContentLoaded", () => {
    // ФОРМА ОБРАТНОЙ СВЯЗИ БЕЗ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ

    // создаем сообщения для пользователя, которые будут отображаться при различном исходе отправки формы
    const message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся!",
        failure: "Что-то пошло не так...",
    };

    // получаем саму форму обратной связи
    const form = document.querySelector(".main-form");
    // получаем все интупты из этой формы
    const input = form.getElementsByTagName("input");
    // создаем новый элемент, который будет выводить сообщение пользователю о статусе отправки формы
    const statusMessage = document.createElement("div");

    // присваиваем переменной statusMessage класс "status", стили для которого заранее определили в css
    statusMessage.classList.add("status");

    // при отправке формы на сервер (обработчик submit необходимо навершивать именно на форму, а не на кнопку)
    form.addEventListener("submit", (event) => {
        // отменяем стандартное поведение браузера, когда страница перезагружается при отправки формы
        event.preventDefault();
        // добавляем в форму созданный выше div, который будет оповещать пользователя о статусе отправки формы
        form.appendChild(statusMessage);

        // создаем объект XMLHttpRequest - это встроенный в браузер объект, который даёт возможность делать HTTP-запросы к серверу без перезагрузки страницы.
        const request = new XMLHttpRequest();
        // настраиваем запрос: POST-запрос по URL server.php
        request.open("POST", "server.php");
        // устанавливаем заголовок запроса: setRequestHeader(name, value)
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // создаем новую перемеенную в которую помещаем все, что заполнил пользователь через FormData()
        const formData = new FormData(form);
        // отсылаем запрос c телом formData, то есть с теми данными, которые ввел пользователь
        request.send(formData);

        // отслеживаем измнения состояния запроса
        request.addEventListener("readystatechange", () => {
            // если текущее состояние запроса < 4 (то есть заспрос не завершен)
            if (request.readyState < 4) {
                // показываем пользователю сообщение, что происходит загрузка
                statusMessage.innerHTML = message.loading;
                // если текущее состояние запроса = 4 (то есть заспрос завершен) и статус заспроса = 200 (то есть заспрос выполнен успешно)
            } else if (request.readyState === 4 && request.status == 200) {
                // показываем пользователю сообщение об успешном выполнении заспроса
                statusMessage.innerHTML = message.success;
                // в ином случае
            } else {
                // показываем пользователю сообщение об ошибке
                statusMessage.innerHTML = message.failure;
            }
        });

        // очищаем все инпуты
        for (let i = 0; i < input.length; i++) {
            input[i].value = "";
        }
    });

    // сейчас данные отправляются в обычном формате. Если мы хотим отправлять данные в формате JSON, то необходимо:
    // 1) поменять заголовок заспроса на request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    // 2) данные, которые получаем из формы преобразовать в json-формат: после let formData = new FormData(form) создаем промежуточный пустой объект let obj = {}; и заполняем его данными из formData с помощью цикла forEach:
    /*  formData.forEach(function (value, key) {
        obj[key] = value;
    }); */
    // 3) объект JavaScript (obj) трансформируем в строку JSON: let json = JSON.stringify(obj);
    // 4) заменяем тело запроса: request.send(json);

    // в итоге должно полуиться так:
    // ...
    /* request.setRequestHeader("Content-type", "application/json; charset=utf-8");

	let formData = new FormData(form);
	let obj = {};

	formData.forEach(function (value, key) {
        obj[key] = value;
    });
	let json = JSON.stringify(obj);
	request.send(json); */
    // ...
});
