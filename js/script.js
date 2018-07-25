var appEl = document.querySelector('#app');// app element
var ulEl = document.getElementById("lista"); // Ul element

var inputEl = document.createElement('input'); //Input
inputEl.name = 'addNode';
inputEl.type = 'text';

var btnEl = document.createElement('input'); // button
btnEl.value = 'Adicionar';
btnEl.type = 'button';

appEl.appendChild(inputEl);
appEl.appendChild(btnEl);

var todos = JSON.parse(localStorage.getItem('list_todos')) || ['Fazer café','Estudar Javascript','Jogar futebol'];

function renderTodo (argument) {
	ulEl.innerHTML = '';

	for (todo of todos) {
		var todoElement = document.createElement('li');
		var todoText = document.createTextNode(todo);
		var link = document.createElement('a');
		link.setAttribute('href', '#');

		var  pos = todos.indexOf(todo);

		link.setAttribute('onclick', 'removeNode( '+ pos +')');
		link.appendChild(document.createTextNode("Remover"));

		todoElement.appendChild(todoText);
		todoElement.appendChild(link);
		ulEl.appendChild(todoElement);
	}
}

renderTodo();

function addNode (argument) {
	var valInput = inputEl.value;

	if (valInput !== '') {
		todos.push(valInput);
	}

	inputEl.value = '';

	renderTodo();
	saveToStorage();
}

function removeNode (pos) {
	todos.splice(pos, 1);
	renderTodo();
	saveToStorage();
}

btnEl.onclick = function (event) {
	addNode();
}

// Salvar função no Local Storage
function saveToStorage () {
	localStorage.setItem('list_todos', JSON.stringify(todos)); 
}
