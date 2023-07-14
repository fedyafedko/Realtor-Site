let toolsState = true; // Початковий стан елемента <div id="tools">
let toolsAfterRegisterState = false; // Початковий стан елемента <div id="toolsAfterRegister">

function changeObject() {
    // Зміна стану елементів
    toolsState = !toolsState;
    toolsAfterRegisterState = !toolsAfterRegisterState;

    // Оновлення відображення елементів на основі станів
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