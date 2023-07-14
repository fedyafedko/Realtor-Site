localStorage.clear();
function Login(event) {
    event.preventDefault();
    const login = document.getElementById('floatingLogin').value;
    const password = document.getElementById('floatingPassword').value;
    const dataLogin = {
        login: "VladFedko",
        password: "Vlad1211"
    }

    fetch('http://localhost:5116/Auth/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataLogin)
    })
        .then(function(response) {
            if (response.ok) {
                console.log('Login request done');
                return response.json();
            } else {
                alert("No user found");
                throw new Error('Login request failed');
            }
        })
        .then(function(data) {
            localStorage.setItem('token', data.token);
            location.reload();
            window.location.href = '../MainPage/main.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


