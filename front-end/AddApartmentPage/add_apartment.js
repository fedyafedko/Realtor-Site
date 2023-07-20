const token = localStorage.getItem('token');
function addApartment(event) {
    event.preventDefault();
    const address = document.getElementById('inputAddress').value;
    const city = document.getElementById('inputCity').value;
    const floor = document.getElementById('inputFloor').value;
    const square = document.getElementById('inputSquare').value;
    const rooms = document.getElementById('inputRooms').value;
    const name = document.getElementById('inputName').value;
    const description = document.getElementById('inputDescription').value;
    const images = document.getElementById('inputImages').files;
    const imagesArray = Array.from(images).map(file => file.name);
    const imagesString = imagesArray.join(',');
    const priceCurrency = document.querySelector('.select select').value;
    const price = document.querySelector('.input').value + priceCurrency;
    const email = document.getElementById('inputEmail').value;
    const phone = document.getElementById('inputPhone').value;

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
    fetch('http://localhost:5116/apartment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })
        .then(function(response) {
            if (response.ok) {
                console.log('Add apartment done');
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


