// Задание 1.

// Реализовать чат на основе эхо - сервера wss: //echo.websocket.org/
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки« Отправить».

// При клике на кнопку« Отправить» сообщение должно появляться в окне переписки.

// Эхо - сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:
// Добавить в чат механизм отправки гео - локации:

let element = document.querySelector('.chat__window'),
    url = 'wss://echo.websocket.org/',
    btnSend = document.querySelector('.chat__send'),
    messageInput = document.querySelector('.chat__input'),
    btnGeo = document.querySelector('.chat__geolacation'),
    chatWindow = document.querySelector('.chat__window'),
    websocket;


//функция добавления сообщения в окно переписки
function htmlGeneration(message, classLocation) {
    let newMessage = document.createElement('p');
    newMessage.classList.add('chat__message');
    newMessage.classList.add(classLocation);
    newMessage.textContent = message;
    return newMessage;
}

//открываем соединение с сервером, навешиваем обработчики событий
websocket = new WebSocket(url);

websocket.onopen = () => {
    console.log('соединение установлено!');
    alert('соединение установлено! можете отправлять сообщения!');
};

websocket.onclose = () => {
    console.log('соединение разорвано!');
    alert('соединение разорвано!');

};

websocket.onmessage = function (evt) {
    // console.log(evt.data);
    if (evt.data.indexOf('www.openstreetmap.org') < 1) {
        chatWindow.appendChild(htmlGeneration(evt.data, 'chat__message-recipient'));
    }

    //если в окне чата появится скролл, то он отскроллится вниз
    element.scrollTop = element.scrollHeight;
};

websocket.onerror = function (evt) {
    console.log('ошибка соединения');
    alert('ошибка соединения!');
};


//кнопка отправить сообщение
btnSend.addEventListener('click', () => {
    console.log(messageInput.value);
    websocket.send(messageInput.value);
    chatWindow.appendChild(htmlGeneration(messageInput.value, 'chat__message-sender'));

    //если в окне чата появится скролл, то он отскроллится вниз
    element.scrollTop = element.scrollHeight;
    messageInput.value = '';
});

//кнопка отправить геолокацию 

btnGeo.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        console.log('геолокация поддерживается');
        
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;

            const mapLink = document.createElement('a');
            mapLink.href = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
            mapLink.textContent = 'Гео-локация';
            mapLink.classList.add('chat__message');
            mapLink.classList.add('chat__message-sender');
            websocket.send(mapLink);
            chatWindow.appendChild(mapLink);
        });
    } else {
        console.log('доступа нет');
    }
});

