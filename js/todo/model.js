/**
 * Created by abalasubramanian on 2/10/15.
 */

// Model
var Todo = Backbone.Model.extend({
    defaults: {
        description: "",
        status: "incomplete"
    },

    initialize: function() {
        console.log("the model has been initialized")
    },

    toggleStatus : function() {
        if (this.get('status') === 'complete') {
            this.set({status:'incomplete'});
        } else {
            this.set({status:'complete'});
        }
    }
});

// Model instance
var todo = new Todo({
    description: "Pick up meal"
});

// Model View
var TodoView = Backbone.View.extend({
    tagName:'article',

    id:'todo-view',

    className:'todo',

    template: _.template("<h3>" +
    "<input type=checkbox <% if(status === 'complete') print('checked'); %>>" +
    "<%=description%> </h3>"),

    initialize: function() {
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
    },

    render: function() {
        var json = this.model.toJSON();
        this.$el.html(this.template(json));
    },

    remove: function() {
        this.$el.remove();
    },

    events:{
        'change input':'toggleStatusAndStrike'
    },

    toggleStatusAndStrike : function() {
        this.toggleStrike();
        this.model.toggleStatus();
    },

    toggleStrike: function() {
        this.$el.toggleClass("complete");
    }
});

// Model View instance
var todoView = new TodoView({
    model: todo
});
todoView.render();
console.log("TodoView ", todoView.el);

// Collection
var TodoList = Backbone.Collection.extend({
    model: Todo
});

// Collection instance
var todos = [
    {description: 'Pick up milk', status: 'incomplete'},
    {description: 'Get a car wash', status: 'incomplete'},
    {description: 'Learn Backbone', status: 'incomplete'}
];

var todoList = new TodoList(todos);
var todo1 = new Todo({description: 'Call PCP', status: 'incomplete'});
var todo2 = new Todo({description: 'Pay your rent', status: 'incomplete'});
todoList.add(todo1);
todoList.add(todo2);

//Collection view
var TodoListView = Backbone.View.extend({

    render: function() {
        console.log("Collection ", this.collection);
        this.collection.forEach(this.addOne, this);
    },

    addOne: function(todoItem) {
        var todoView = new TodoView({model: todoItem});
        todoView.render();
        this.$el.append(todoView.el);
    }
});

// Collection view instance
var todoListView = new TodoListView({
   collection: todoList
});

todoListView.render();
console.log("TodoListView ", todoListView.el);
$("#main").html(todoListView.el);