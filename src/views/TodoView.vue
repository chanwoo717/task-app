<template>
    <div class="todo">
        <div class="greeting">
            <h1 class="title"> Greetings, <input type="text" id="name" placeholder="Name here" v-model="name" >
            </h1>
        </div>
        <div class="create-todo">
            <h3>CREATE YOUR TODO-LIST </h3>
            <form @submit.prevent="addTodo">
                <h4>What's on your todo list?</h4>
                <input type="text" name="content" id="content" placeholder="e.g. make a video" v-model="input_content" />
                <h4>Pick a category</h4>
                <div class="options">
                    <label>
                        <input type="radio" name="category" value="work" v-model="input_category" />
                        <span class="bubble work"></span>
                        <div>Work</div>
                    </label>
                    <label>
                        <input type="radio" name="category" value="personal" v-model="input_category" />
                        <span class="bubble personal"></span>
                        <div>Personal</div>
                    </label>
                </div>
                <input type="submit" value="Add Todo" />
            </form>
        </div>
        <div class="todo-list">
            <h3>TODO LIST</h3>
            <div class="list">
                <div v-for="todo in todos_asc" :key="todo.id" :class="`todo-item ${todo.done && 'done'}`">
                    <label>
                        <input type="checkbox" v-model="todo.done" />
                        <span :class="`bubble ${todo.category}`" title="Click if task is completed"></span>
                    </label>
                    <div class="todo-content">
                        <input type="text" v-model="todo.content" title="To edit, click on text">
                    </div>
                    <div class="actions">
                        <button class="delete" @click="removeTodo(todo)"> Delete </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch, onUpdated } from 'vue';

const todos = ref([]);
const name = ref('');

const input_content = ref('');
const input_category = ref(null);

const todos_asc = computed(() => todos.value)

const orderedTodo = ()=>{
	todos.value.sort((a, b) => {
		return b.createdAt - a.createdAt
	})
} 	

onMounted(() => {
	name.value = localStorage.getItem('name') || '';
	todos.value = JSON.parse(localStorage.getItem('todos')) || []
	orderedTodo();	
})

onUpdated(orderedTodo)

watch(todos, (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
}, { deep: true })

watch(name, (newVal) => {
    localStorage.setItem('name', newVal)
})

const addTodo = () => {
    if (input_content.value.trim() === '' || input_category.value === null) {
        alert('Insert a todo and Select a category please!');
		return
    }

    todos.value.push({
        content: input_content.value,
        category: input_category.value,
        done: false,
        editable: false,
        createdAt: new Date().getTime(),
    })

    input_content.value = '';
    input_category.value = null;

}

const removeTodo = (todo) => {
    todos.value = todos.value.filter((t) => t !== todo)
}

</script>

<style lang="scss" scoped>

body{
	background-color: #343d4b;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;
}

input:not([type="radio"]):not([type="checkbox"]), button {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	cursor: initial;
}

h3 {
	color: white;
	margin-bottom: 2rem;
	font-size: 2rem;

}

h4 {
	color: white;
	font-weight: 400;
	margin-bottom: 1rem;

}

.todo{
	border-radius: 20px;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19);
	padding: 80px 150px;
	width: 100%;
	height: 100%;
	margin: 2rem auto;
	background-color: #212730;
	--primary: #EA40A4;
	--work: #3A82EE;
	--personal: var(--primary);
	--light: #EEE;
	--grey: #888;
	--dark: #313154;
	--danger: #ff5b57;

	--shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

	--work-glow: 0px 0px 4px rgba(58, 130, 238, 0.75);
	--personal-glow: 0px 0px 4px rgba(234, 64, 164, 0.75);
}

.title {
	display: flex;
	margin-bottom: 50px;
}

.greeting .title,
.greeting .title input {
	color: white;
	margin-left: 0.5rem;
	font-size: 1.5rem;
	font-weight: 700;
}

.create-todo input[type="text"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	background-color: #FFF;
	border-radius: 0.5rem;
	margin-bottom: 1.5rem;
}

.create-todo .options {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	margin: 0 auto 1.5rem;
	width: 100%;
	justify-content: center;
	align-items: center;
}

.create-todo .options label {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	background-color: #FFF;
	border-radius: 0.5rem;

	cursor: pointer;
}

input[type="radio"],
input[type="checkbox"] {
	display: none;
}

.bubble {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid var(--work);
	box-shadow: var(--work-glow);
}

.bubble.personal {
	border-color: var(--personal);
	box-shadow: var(--personal-glow);
}

.bubble::after {
	content: "";
	display: block;
	opacity: 0;
	width: 0px;
	height: 0px;
	background-color: var(--work);
	box-shadow: var(--work-glow);
	border-radius: 50%;
	transition: 0.2s ease-in-out;
}

.bubble.personal::after {
	background-color: var(--personal);
	box-shadow: var(--personal-glow);
}

input:checked ~ .bubble::after {
	width: 10px;
	height: 10px;
	opacity: 1;
}

.create-todo .options label div {
	color: var(--dark);
	font-size: 1.125rem;
	margin-top: 1rem;
}

.create-todo input[type="submit"] {
	display: block;
	width: 100%;
	font-size: 1.25rem;
	padding: 1rem;
	color: #FFF;
	background-image: linear-gradient(to right, var(--work), var(--personal));
	border-radius: 0.5rem;
	box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition: 0.2s ease-in-out;
	margin-bottom: 2rem;
}

.create-todo input[type="submit"]:hover {
	opacity: 0.75;
}

.todo-list .list {
	margin: 1rem 0;
} 

.todo-list .todo-item {
	display: flex;
	align-items: center;
	background-color: #FFF;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1rem;
}

.todo-item label {
	display: block;
	margin-right: 1rem;
	cursor: pointer;
}

.todo-item .todo-content {
	flex: 1 1 0%;
}

.todo-item .todo-content input {
	color: var(--dark);
	font-size: 1.125rem;
}

.todo-item .actions {
	display: flex;
	align-items: center;
}

.todo-item .actions button {
	display: block;
	padding: 0.5rem;
	border-radius: 0.25rem;
	color: #FFF;
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.todo-item .actions button:hover {
	opacity: 0.75;
}

.todo-item .actions .edit {
	margin-right: 0.5rem;
	background-color: var(--primary);
}

.todo-item .actions .delete {
	background-color: var(--danger);
}

.todo-item.done .todo-content input {
	text-decoration: line-through;
	color: var(--grey);
}
</style>