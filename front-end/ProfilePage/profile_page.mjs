const token = localStorage.getItem('token');

fetch(`http://localhost:5116/Auth/${token}`, {
    method: 'GET'
})
    .then(response => response.json())
    .then(data => {
        // Оновлення вмісту елементів з отриманими даними з API
        document.getElementById('loginInfo').textContent =`Login: ${data.login}`;
        document.getElementById('roleInfo').textContent = `Role: ${data.role}`;
        document.getElementById('emailInfo').textContent = `Email: ${data.email}`;
        document.getElementById('phoneInfo').textContent = `Phone: ${data.phone}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
