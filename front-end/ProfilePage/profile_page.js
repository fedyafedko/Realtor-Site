const loginEndpoint = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3IiwibG9naW4iOiJTc2RzZGRzdHJpbmciLCJyb2xlIjoiUmVhbHRvciIsImp0aSI6IjhkYWYxMGU1LWE4M2EtNDhjZi04Y2RhLWNjZDQwY2JlNDg0MSIsIm5iZiI6MTY4OTE5NjYzNiwiZXhwIjoxNjg5MjAzODM2LCJpYXQiOjE2ODkxOTY2MzYsImlzcyI6ImZlZHlhZmVka28uY29tIiwiYXVkIjoiZmVkeWFmZWRrby5jb20ifQ.IK-XCxlVX9B1WIvL_lr_arNLjXWPQDRF_S7VtH9S7Zg'; // Замініть на власний URL ендпоінта авторизації

fetch('http://localhost:5116/1', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${loginEndpoint}`
    }
})
    .then(function(response) {
        if (response.ok) {
            console.log('Registration request done');
            return response.json();
        } else {
            throw new Error('Registration request failed');
        }
    })
    .then(function(data) {// Збереження отриманого токена в змінну
        console.log(data);
    })