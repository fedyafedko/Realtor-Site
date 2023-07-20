const token = localStorage.getItem('token');

fetch(`http://localhost:5116/Auth/${token}`, {
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
    .catch(error => {
        console.error('Error:', error);
    });
const signOutButton = document.getElementById('sign_out');

// Функція, яка викликається при натисканні на кнопку "Sign out"
function handleSignOut() {
    // Очистіть localStorage за допомогою методу clear()
    localStorage.clear();

    // Перенаправте користувача на сторінку, зазначену у посиланні
    window.location.href = signOutButton.href;
}

// Додайте прослуховувач події на натискання кнопки "Sign out"
signOutButton.addEventListener('click', handleSignOut);