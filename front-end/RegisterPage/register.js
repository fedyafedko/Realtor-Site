const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');
function Register(event) {
    event.preventDefault();

    const login = document.getElementById('floatingLogin').value;
    const password = document.getElementById('floatingPassword').value;
    const email = document.getElementById('floatingEmail').value;
    const phone = document.getElementById('floatingPhone').value;
    const userType = document.querySelector('input[name="options-outlined"]:checked').id;
    const image = fileInput.files[0].name;
    const data = {
        login: login,
        password: password,
        email: email,
        phone: phone,
        role: userType,
        image: image
    };
    const dataLogin = {
        login: login,
        password: password
    }
    let token;

    fetch('http://localhost:5116/Auth/Register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function(response) {
            if (response.ok) {
                console.log('Registration request done');
                return response.json();
            } else {
                throw new Error('Registration request failed');
            }
        })
        .then(function(data) {
            token = data;
            console.log('API response (token):', token);

            // Виконання запиту для авторизації з використанням токена
            return fetch('http://localhost:5116/Auth/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataLogin)
            });
        })
        .then(function(response) {
            if (response.ok) {
                console.log('Login request done');
                location.reload();
                alert("You are successfully registered")
                window.location.href = '../MainPage/mainAfterAuth.html';
            } else {
                throw new Error('Login request failed');
            }
        })
        .catch(function(error) {
            console.error('Error:', error);
        });

}

fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function() {
            previewImage.src = reader.result;
            previewImage.style.display = 'block';
        });

        reader.readAsDataURL(file);
    }
});
document.getElementById("fileInput").addEventListener("change", function(event) {
    let file = event.target.files[0];
    console.log(file.name);
});