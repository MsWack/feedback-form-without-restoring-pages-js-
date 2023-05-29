feedback-form-without-restoring-pages-js-
### JS-код для отправки формы обратной связи без перезагрузки страницы.

1. При необходимости создаем сообщения для пользователя, которые будут отображаться при различном исходе отправки формы.

2. Необходимо создать переменные, в которые помещаем следующие элементы: 
* сама форма обратной связи (form);
* все интупы из этой формы (input) (чтобы при отправки формы мы могли их очистить);

А также необходимо создать новый элемент div (statusMessage), который будет выводить сообщение пользователю о статусе отправки формы, которому сразу присваиваем класс "status", стили для которого заранее определили в css.

3. На форму навешиваем обработчик события "submit" (обработчик submit необходимо навешивать именно на форму, а не на кнопку в форме) и создаем следующую CallBack-функцию:

    3.1. Отменяем стандартное поведение браузера, когда страница перезагружается при отправки формы и добавляем в форму созданный выше div, который будет оповещать пользователя о статусе отправки формы. 

    3.2. Создаем объект XMLHttpRequest (request) - это встроенный в браузер объект, который даёт возможность делать HTTP-запросы к серверу без перезагрузки страницы. 

    3.3. Настраиваем запрос: POST-запрос по URL server.php.

    3.4. Устанавливаем заголовок запроса.

    3.5. Создаем новую перемеенную (formData), в которую помещаем все, что заполнил пользователь с использованием FormData().

    3.6. Отсылаем запрос c телом formData, то есть с теми данными, которые ввел пользователь.

    3.7. На созданный выше объект XMLHttpRequest (request) навешиваем обработчик события "readystatechange", который позволяет отслеживать измнения состояния запроса и создаем условия, при которых пользователю будет выводиться то или иное сообщение в зависимости от текущего состояния запроса.

    3.8. Очищаем все инпуты.

---

Сейчас данные отправляются в обычном формате. Если мы хотим отправлять данные в формате JSON, то необходимо:
1. Поменять заголовок заспроса на:

        request.setRequestHeader("Content-type", "application/json; charset=utf-8").
    
2. данные, которые получаем из формы преобразовать в json-формат, после создаем промежуточный пустой объект и заполняем его данными из formData с помощью цикла forEach:

        let formData = new FormData(form);

        let obj = {}; 

        formData.forEach(function (value, key) {
                obj[key] = value;
        });
    
3. Объект JavaScript (obj) трансформируем в строку JSON: 

        let json = JSON.stringify(obj);
        
4. Зменяем тело запроса на:

        request.send(json).

В итоге должно получиться так:

    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    
    let formData = new FormData(form);
    let obj = {};

    formData.forEach(function (value, key) {
        obj[key] = value;
    });
    
    let json = JSON.stringify(obj);
    
    request.send(json);
 
---

Если необходимо подключить скрипт отправки данных с формы к нескольким формам, можно создать функцию, которая будет принимать форму в качестве аргумента и применять обработчик события "submit" к этой форме. Например:
    
    function setupFormSubmission(form) {
    let input = form.getElementsByTagName("input"),
        statusMessage = document.createElement("div");
        
    statusMessage.classList.add("status");
    
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open("POST", "server.php");
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            let formData = new FormData(form);
            request.send(formData);

            request.addEventListener("readystatechange", function () {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = "";
            }
        });
    }
    
    let form1 = document.querySelector(".main-form");
    let form2 = document.querySelector("#form");

    setupFormSubmission(form1);
    setupFormSubmission(form2);
    
В этом примере функция setupFormSubmission принимает форму в качестве аргумента и применяет обработчик события "submit" к этой форме. Таким образом, можно вызывать эту функцию для разных форм, передавая каждую форму в качестве аргумента.
