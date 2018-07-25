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


// Requisição AJAX
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.github.com/users/brunoBrian'); //Buscar informação
xhr.send(null);

xhr.onreadystatechange = function () {
	if (xhr.readyState === 4) {
		var response = JSON.parse(xhr.responseText);
		console.log(response.login);
	}
}



// Promise
var minhaPromise = function () {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.github.com/users/brunoBrian'); //Buscar informação
		xhr.send(null);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				} else {
					reject('Erro na requisição!');
				}
			}
		}
	});
}

minhaPromise()
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.warn(error);
	});




// Axios
axios.get('https://api.github.com/users/brunoBrian')
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.warn(error);
	});

