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
fetch('http://localhost:5116/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
})
    .then(response => response.json())
    .then(data => {
        const priceElement = document.getElementById('price');
        const addressElement = document.getElementById('address');
        const cityElement = document.getElementById('city');
        const squareElement = document.getElementById('square');
        const emailElement = document.getElementById('email');
        const phoneElement = document.getElementById('phone');

        priceElement.innerText = data[0].price;
        addressElement.innerHTML = `<img src="../Images/adress.png" alt="" class="imageInfo"> ${data[0].address}`;
        cityElement.innerHTML = `<img src="../Images/city.png" alt="" class="imageInfo"> ${data[0].city}`;
        squareElement.innerHTML = `<img src="../Images/square.png" alt="" class="imageInfo"> ${data[0].square}`;
        emailElement.innerHTML = `<img src="https://cdn.icon-icons.com/icons2/788/PNG/512/email_icon-icons.com_64925.png" alt="" class="imageInfo"> ${data[0].email}`;
        phoneElement.innerHTML = `<img src="../Images/phone.png" alt="" class="imageInfo"> ${data[0].phone}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });