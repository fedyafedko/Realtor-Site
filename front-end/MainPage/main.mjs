let toolsState = true;
let toolsAfterRegisterState = false;

function changeObject() {
    toolsState = !toolsState;
    toolsAfterRegisterState = !toolsAfterRegisterState;

    document.getElementById('tools').style.display = toolsState ? 'block' : 'none';
    document.getElementById('toolsAfterRegister').style.display = toolsAfterRegisterState ? 'block' : 'none';
}
const token = localStorage.getItem('token');

if (token) {
    document.getElementById('tools').style.display = 'none';
    document.getElementById('toolsAfterRegister').style.display = 'block';
} else {
    document.getElementById('tools').style.display = 'block';
    document.getElementById('toolsAfterRegister').style.display = 'none';
}
// Отримання даних з API
fetch('http://localhost:5116/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(response => response.json())
    .then(data => {
        const apartContainer = document.getElementById('apartContainer');
        const imageUrls = data[0].images.split(',');

        // Задайте стиль контейнера для гнучкого розміщення елементів
        apartContainer.style.display = 'flex';
        apartContainer.style.flexWrap = 'wrap'; // Перенесення елементів на новий рядок, коли вони не поміщаються

        // Цикл для кожного об'єкта в масиві даних
        data.forEach((apartment) => {
            const apartmentElement = document.createElement('div');
            apartmentElement.id = 'apart';

            apartmentElement.style.cursor = 'pointer';
            apartmentElement.style.width = '250px';
            apartmentElement.style.height = '360px';
            apartmentElement.style.background = '#E3DBDB';
            apartmentElement.style.position = 'relative';
            apartmentElement.style.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
            apartmentElement.style.margin = '10px'; // Відступи між блоками

            apartmentElement.style.margin = '20px';

            // Додавання обробника події для натискання на об'єкт
            apartmentElement.addEventListener('click', () => {
                window.location.href = `../ApartmentPage/apartment.html?idApartment=${apartment.id}&idUser=${apartment.idUser}`;
            });

            // Отримання елементів для заповнення даними
            const previewImageElement = document.createElement('img');
            previewImageElement.id = 'previewImage';
            previewImageElement.src = `../ImageForApartment/${imageUrls[0]}`;
            previewImageElement.alt = 'Preview Image';
            previewImageElement.style.width = '250px';
            previewImageElement.style.height = '200px';

            const infoElement = document.createElement('div');
            infoElement.id = 'info';
            infoElement.style.width = '250px';
            infoElement.style.height = '200px';
            infoElement.style.position = 'relative';

            // Заповнення об'єкта даними
            const priceElement = document.createElement('p');
            priceElement.id = 'price';
            priceElement.style.fontFamily = 'Arial Black';
            priceElement.style.fontSize = '20px';
            priceElement.innerText = apartment.price;
            priceElement.style.display = 'block'; // Встановлення стилю block

            const addressElement = document.createElement('p');
            addressElement.id = 'address';
            addressElement.style.display = 'block'; // Встановлення стилю block
            addressElement.style.margin = '0';
            addressElement.innerHTML = `<img src="../Images/adress.png" alt="" class="imageInfo"> ${apartment.address}`;

            const cityElement = document.createElement('p');
            cityElement.id = 'city';
            cityElement.style.display = 'block'; // Встановлення стилю block
            cityElement.style.margin = '0';
            cityElement.innerHTML = `<img src="../Images/city.png" alt="" class="imageInfo"> ${apartment.city}`;

            const squareElement = document.createElement('p');
            squareElement.id = 'square';
            squareElement.style.display = 'block'; // Встановлення стилю block
            squareElement.style.margin = '0';
            squareElement.innerHTML = `<img src="../Images/square.png" alt="" class="imageInfo"> ${apartment.square}`;

            const emailElement = document.createElement('p');
            emailElement.id = 'email';
            emailElement.style.display = 'block'; // Встановлення стилю block
            emailElement.style.margin = '0';
            emailElement.innerHTML = `<img src="https://cdn.icon-icons.com/icons2/788/PNG/512/email_icon-icons.com_64925.png" alt="" class="imageInfo"> ${apartment.email}`;

            const phoneElement = document.createElement('p');
            phoneElement.id = 'phone';
            phoneElement.style.display = 'block'; // Встановлення стилю block
            phoneElement.style.margin = '0';
            phoneElement.innerHTML = `<img src="../Images/phone.png" alt="" class="imageInfo"> ${apartment.phone}`;


            // Додавання елементів до блоку даних
            infoElement.appendChild(priceElement);
            infoElement.appendChild(addressElement);
            infoElement.appendChild(cityElement);
            infoElement.appendChild(squareElement);
            infoElement.appendChild(emailElement);
            infoElement.appendChild(phoneElement);

            apartmentElement.appendChild(previewImageElement);
            apartmentElement.appendChild(infoElement);

            // Додавання блоку даних до контейнера
            apartContainer.appendChild(apartmentElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
const apartElement = document.getElementById('apart');
function handleApartClick() {
    window.location.href = '../ApartmentPage/apartment.html';
}

apartElement.addEventListener('click', handleApartClick);