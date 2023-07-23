const urlParams = new URLSearchParams(window.location.search);
const idApartment = urlParams.get('idApartment');
const idUser = urlParams.get('idUser');
const token = localStorage.getItem('token');
const boxElement = document.querySelector('.box');
const headerElement = document.querySelector('header');
const apartmentElement = document.getElementById('update');
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
        const emailElement = document.getElementById('email');
        const phoneElement = document.getElementById('phone');
        const sliderContainer = document.querySelector('.slider-container');

        const imageUrls = data.images.split(',');
        for (let i = 0; i < imageUrls.length; i++) {
            const imgElement = document.createElement("img");
            imgElement.src = `../ImageForApartment/${imageUrls[i]}`;
            imgElement.alt = 'Image';

            sliderContainer.appendChild(imgElement);
        }

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
        descriptionElement.innerHTML = `${data.description}`;
        return fetch(`http://localhost:5116/Auth/id=${idUser}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                const loginInfoElement = document.getElementById('loginInfo');
                const emailInfoElement = document.getElementById('emailInfo');
                const profileImage = document.getElementById('profileImage');

                emailElement.innerHTML = `<img src="https://cdn.icon-icons.com/icons2/788/PNG/512/email_icon-icons.com_64925.png" alt="" class="imageInfo"> ${data.email}`;
                phoneElement.innerHTML = `<img src="../Images/phone.png" alt="" class="imageInfo"> ${data.phone}`;
                loginInfoElement.textContent = data.login;
                emailInfoElement.textContent = data.email;
                profileImage.setAttribute('src', `../ImagesForUserProfile/${data.images}`);
            })
    })
    .catch(error => {
        console.error('Error:', error);
    });
function updateBoxPosition() {
    const headerHeight = headerElement.offsetHeight;
    const scrollPosition = window.scrollY;

    const availableRange = 1000;

    const newPosition = Math.min(Math.max(0, scrollPosition - headerHeight), availableRange);

    boxElement.style.transform = `translateY(${newPosition}px)`;
}

window.addEventListener('scroll', updateBoxPosition);

window.addEventListener('resize', updateBoxPosition);

updateBoxPosition();


fetch(`http://localhost:5116/Auth/${token}`, {
    method: 'GET'
})
    .then(response => response.json())
    .then(data => {
        if (data.id === parseInt(idUser)) {
            document.getElementById('buttonForEdit').style.display = 'block';
        } else {
            document.getElementById('buttonForEdit').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
function deleteApart(event){
    fetch(`http://localhost:5116/${idApartment}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(function(response) {
            if (response.ok) {
                console.log('Delete apartment done');
                alert("You deleted apartment");
                location.reload();
                window.location.href = '../MainPage/main.html';
                return response.json();
            } else {
                alert("You have entered incorrect parameters");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
    apartmentElement.addEventListener('click', () => {
        window.location.href = `../UpdateApartment/update_page.html?idApartment=${idApartment}&idUser=${idUser}`;
    });