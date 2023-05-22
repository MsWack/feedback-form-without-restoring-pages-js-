window.addEventListener("DOMContentLoaded", () => {
    // ФОРМА ОБРАТНОЙ СВЯЗИ БЕЗ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ

    // сообщения для пользователя
    let message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся!",
        failure: "Что-то пошло не так...",
    };

    // получаем саму форму обратной связи
    let form = document.querySelector(".main-form");
    // получаем все интупты из этой формы
    let input = form.getElementsByTagName("input");
    // создаем новый элемент div
    let statusMessage = document.createElement("div");

    // присваиваем переменной statusMessage класс "status"
    statusMessage.classList.add("status");

    // при отправке формы на сервер 
    form.addEventListener("submit", (event) => {
        // отменяем стандартное поведение браузера
        event.preventDefault();
        // добавляем в форму созданный выше div
        form.appendChild(statusMessage);

        // создаем объект XMLHttpRequest
        let request = new XMLHttpRequest();
        // настраиваем запрос
        request.open("POST", "server.php");
        // устанавливаем заголовок запроса: setRequestHeader(name, value)
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // создаем новую перемеенную в которую помещаем все, что заполнил пользователь через FormData()
        let formData = new FormData(form);
        // отсылаем запрос
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
});
