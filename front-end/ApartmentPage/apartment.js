const urlParams = new URLSearchParams(window.location.search);
const idApartment = urlParams.get('idApartment');
const idUser = urlParams.get('idUser');
fetch(`http://localhost:5116/${idApartment}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(response => response.json())
    .then(data => {
        const priceElement = document.getElementById('price');
        const addressElement = document.getElementById('address');
        const cityElement = document.getElementById('city');
        const squareElement = document.getElementById('square');
        const floorElement = document.getElementById('floor');
        const roomsElement = document.getElementById('number_rooms');
        const descriptionElement = document.getElementById('description');
        const sliderContainer = document.querySelector('.slider-container');

        const imageUrls = data.images.split(',');
        for (let i = 0; i < imageUrls.length; i++) {
            // Створити новий <img> елемент
            const imgElement = document.createElement("img");
            imgElement.src = `../ImageForApartment/${imageUrls[i]}`;
            imgElement.alt = 'Image';

            // Додати новий <img> елемент до контейнера слайдера
            sliderContainer.appendChild(imgElement);
        }

        // Пролистування слайдів
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        const totalImages = sliderContainer.children.length;
        let currentIndex = 0;

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
        priceElement.innerText = data.price;
        addressElement.innerHTML = `<img src="../Images/adress.png" alt="" class="imageInfo"> ${data.address}`;
        cityElement.innerHTML = `<img src="../Images/city.png" alt="" class="imageInfo"> ${data.city}`;
        squareElement.innerHTML = `<img src="../Images/square.png" alt="" class="imageInfo"> ${data.square} m<sup>2</sup>`;
        floorElement.innerHTML = `<img src="../Images/floor.png" alt="" class="imageInfo"> ${data.floor}`;
        roomsElement.innerHTML = `<img src="../Images/rooms.png" alt="" class="imageInfo"> ${data.numberRoom}`;
        descriptionElement.innerHTML = data.description;
        return fetch(`http://localhost:5116/Auth/id=${idUser}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                let image = document.getElementById("profileImage");
                image.setAttribute('src', `../ImagesForUserProfile/${data.images}`);
                console.log(`../ImagesForUserProfile/${data.images}`)
                document.getElementById('loginInfo').textContent =`Login: ${data.login}`;
                document.getElementById('roleInfo').textContent = `Role: ${data.role}`;
                document.getElementById('emailInfo').textContent = `Email: ${data.email}`;
                document.getElementById('phoneInfo').textContent = `Phone: ${data.phone}`;
            })
    })
    .catch(error => {
        console.error('Error:', error);
    });
const signOutButton = document.getElementById('sign_out');

function handleSignOut() {
    // Очистіть localStorage за допомогою методу clear()
    localStorage.clear();

    // Перенаправте користувача на сторінку, зазначену у посиланні
    window.location.href = signOutButton.href;
}