angular.module('ToDoFilms', [])
    .controller('TodoFilmsListController', function () {
        var todoFilmsList = this;
        todoFilmsList.todos = [
            { text: 'Filme 1', done: true },
            { text: 'Filme 2', done: false }];

        todoFilmsList.addTodo = function () {
            todoFilmsList.todos.push({ text: todoFilmsList.todoText, done: false });
            todoFilmsList.todoText = '';
        };

        todoFilmsList.remaining = function () {
            var count = 0;
            angular.forEach(todoFilmsList.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        todoFilmsList.archive = function () {
            var oldTodos = todoFilmsList.todos;
            todoFilmsList.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) todoFilmsList.todos.push(todo);
            });
        };
    });