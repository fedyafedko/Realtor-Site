const urlParams = new URLSearchParams(window.location.search);
const idApartment = urlParams.get('idApartment');
const token = localStorage.getItem('token');
function addFile(event) {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', () => {
        const selectedFiles = fileInput.files;

        const sliderContainer = document.querySelector('.slider-container');

        sliderContainer.innerHTML = '';

        for (const file of selectedFiles) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = file.name;
            sliderContainer.appendChild(img);
        }

        updateSlider();
    });

    function updateSlider() {
        const sliderContainer = document.querySelector('.slider-container');
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
    }
    fileInput.click();
}
fetch(`http://localhost:5116/${idApartment}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(response => response.json())
    .then(data => {
        document.querySelector('select').value = data.currency;
        document.getElementById('price').value = data.price;
        document.getElementById('address').value = data.address;
        document.getElementById('city').value = data.city;
        document.getElementById('floor').value = data.floor;
        document.getElementById('square').value = data.square;
        document.getElementById('number_rooms').value = data.numberRoom;
        document.getElementById('name').value = data.name;
        document.getElementById('description').value = data.description;
        document.getElementById('email').value = data.email;
        document.getElementById('phone').value = data.phone;
    })
    .catch(error => {
        console.error('Error:', error);
    });
function editApartment(event) {
    event.preventDefault();
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const floor = document.getElementById('floor').value;
    const square = document.getElementById('square').value;
    const rooms = document.getElementById('number_rooms').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    const sliderContainer = document.querySelector('.slider-container');
    const images = sliderContainer.querySelectorAll('img');
    const imagesArray = Array.from(images).map(img => img.alt);
    const imagesString = imagesArray.join(',');

    const priceCurrency = document.querySelector('.select select').value;
    const price = document.querySelector('.input').value + priceCurrency;

    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const data = {
        name: name,
        images: imagesString,
        address: address,
        city: city,
        numberRoom: rooms,
        square: square,
        floor: floor,
        description: description,
        price: price,
        email: email,
        phone: phone
    };

    fetch(`http://localhost:5116/${parseInt(idApartment)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                console.log('Edit apartment done');
                alert("You edited apartment");
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
