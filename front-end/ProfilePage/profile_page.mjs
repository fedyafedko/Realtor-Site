const token = localStorage.getItem('token');
fetch(`http://localhost:5116/Auth/${token}`, {
    method: 'GET'
})
    .then(response => response.json())
    .then(data => {
        if (data.role === "Realtor") {
            document.getElementById('add_apartment').style.display = 'block';
            document.getElementById('line').style.display = 'block';
        } else {
            document.getElementById('add_apartment').style.display = 'none';
            document.getElementById('my_apartments').style.display = 'none';
            document.getElementById('apartContainer').style.display = 'none';
        }
        let image = document.getElementById("profileImage");
        image.setAttribute('src', `../ImagesForUserProfile/${data.images}`);
        console.log(`../ImagesForUserProfile/${data.images}`)
        document.getElementById('loginInfo').textContent =`Login: ${data.login}`;
        document.getElementById('roleInfo').textContent = `Role: ${data.role}`;
        document.getElementById('emailInfo').textContent = `Email: ${data.email}`;
        document.getElementById('phoneInfo').textContent = `Phone: ${data.phone}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
fetch('http://localhost:5116/realtor', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
})
    .then(response => response.json())
    .then(data => {
        const apartContainer = document.getElementById('apartContainer');
        apartContainer.style.display = 'none';
        apartContainer.style.flexWrap = 'wrap';

        data.forEach((apartment) => {
            let imageUrls = apartment.images.split(',');
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

            apartmentElement.addEventListener('click', () => {
                window.location.href = `../ApartmentPage/apartment.html?idApartment=${apartment.id}&idUser=${apartment.idUser}`;
            });

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

            const priceElement = document.createElement('p');
            priceElement.id = 'price';
            priceElement.style.fontFamily = 'Arial Black';
            priceElement.style.fontSize = '20px';
            priceElement.innerText = apartment.price;
            priceElement.style.display = 'block';

            const addressElement = document.createElement('p');
            addressElement.id = 'address';
            addressElement.style.display = 'block';
            addressElement.style.margin = '0';
            addressElement.innerHTML = `<img src="../Images/adress.png" alt="" class="imageInfo"> ${apartment.address}`;

            const cityElement = document.createElement('p');
            cityElement.id = 'city';
            cityElement.style.display = 'block';
            cityElement.style.margin = '0';
            cityElement.innerHTML = `<img src="../Images/city.png" alt="" class="imageInfo"> ${apartment.city}`;

            const squareElement = document.createElement('p');
            squareElement.id = 'square';
            squareElement.style.display = 'block';
            squareElement.style.margin = '0';
            squareElement.innerHTML = `<img src="../Images/square.png" alt="" class="imageInfo"> ${apartment.square}`;

            const emailElement = document.createElement('p');
            emailElement.id = 'email';
            emailElement.style.display = 'block';
            emailElement.style.margin = '0';
            emailElement.innerHTML = `<img src="https://cdn.icon-icons.com/icons2/788/PNG/512/email_icon-icons.com_64925.png" alt="" class="imageInfo"> ${apartment.email}`;

            const phoneElement = document.createElement('p');
            phoneElement.id = 'phone';
            phoneElement.style.display = 'block';
            phoneElement.style.margin = '0';
            phoneElement.innerHTML = `<img src="../Images/phone.png" alt="" class="imageInfo"> ${apartment.phone}`;

            infoElement.appendChild(priceElement);
            infoElement.appendChild(addressElement);
            infoElement.appendChild(cityElement);
            infoElement.appendChild(squareElement);
            infoElement.appendChild(emailElement);
            infoElement.appendChild(phoneElement);

            apartmentElement.appendChild(previewImageElement);
            apartmentElement.appendChild(infoElement);

            apartContainer.appendChild(apartmentElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });




const signOutButton = document.getElementById('sign_out');

function handleSignOut() {
    localStorage.clear();
    window.location.href = signOutButton.href;
}
signOutButton.addEventListener('click', handleSignOut);