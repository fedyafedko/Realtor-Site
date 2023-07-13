//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJsb2dpbiI6IlZsYWRGZWRrbyIsInJvbGUiOiJSZWFsdG9yIiwianRpIjoiMjY0ZTQ3OGYtNzBjNS00MDIxLTg1OWYtYmEyNjYyZDcxN2E2IiwibmJmIjoxNjg5MjQyODk3LCJleHAiOjE2ODkyNTAwOTcsImlhdCI6MTY4OTI0Mjg5NywiaXNzIjoiZmVkeWFmZWRrby5jb20iLCJhdWQiOiJmZWR5YWZlZGtvLmNvbSJ9.jGyydH4sQVtr_NZZ6nSEljfPZQHyvzSqv-IfBDD-Z1Y';
import { token1 } from '../LoginPage/login.mjs';
console.log(token1);
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