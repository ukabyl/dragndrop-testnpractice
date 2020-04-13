class TodoApp {
  constructor() {

    const data = JSON.parse(localStorage.getItem('todoDataInfinBank'));
    console.log(data)
    this.data =  data || [];
    this._selectedItem = null;

    this.dashboards = document.querySelectorAll('.dashboard-box');
    this.todoContainer = document.querySelector('[data-type="todoContainer"]').querySelector('.items');
    this.inProgressContainer  = document.querySelector('[data-type="inProgressContainer"]').querySelector('.items');
    this.testingContainer  = document.querySelector('[data-type="testingContainer"]').querySelector('.items');
    this.completeContainer  = document.querySelector('[data-type="completeContainer"]').querySelector('.items');
  }

  _generateId() {
    return Math.floor(Math.random() * 10000);
  }
  createTask(text, type = 'todoContainer') {
    return {
      text,
      id: this._generateId(),
      type
    }
  }
  updateLocalStorage() {
    console.log(this.data)
    localStorage.setItem('todoDataInfinBank', JSON.stringify(this.data))
  }

  _putElement({text, type, id}) {
      let el = document.createElement('div');
      el.className = 'item';
      el.textContent = text;
      el.setAttribute('draggable', true);
      el.setAttribute('data-item-id', id);
      const element = this[type].appendChild(el);
      this._addEvents(element);
  }

  _addEvents(item) {
    const that = this;
    item.addEventListener('dragstart', function(e) {
      setTimeout(function() {
        that._selectedItem = item;
        that._selectedItem.style.display = 'none';
      }, 0)
    })
    item.addEventListener('dragend', function(e) {
      setTimeout(function() {
        that._selectedItem.style.display = 'block';
        that._selectedItem = null;
      }, 0)
    })
  }
  _initializeContainerEvents() {
    const that = this;
    const dashboards = this.dashboards;
    for( let d = 0; d < dashboards.length; d++ ) {
      const dashboard = dashboards[d];


      dashboard.addEventListener('dragover', function(e) {
        e.preventDefault();
        dashboard.style.backgroundColor = 'rgba(0,0,0,0.2)';
      })


      dashboard.addEventListener('dragenter', function(e) {
        e.preventDefault();
        dashboard.style.backgroundColor = 'rgba(0,0,0,0.2)';
      })
      dashboard.addEventListener('dragleave', function(e) {
        e.preventDefault();
        dashboard.style.backgroundColor = 'transparent';
      })


      dashboard.addEventListener('drop', function(e) {
        const itemId = that._selectedItem.dataset.itemId;
        dashboard.style.backgroundColor = 'transparent';
        todo.updateData(this.dataset.type, +itemId)
        this.querySelector('.items')
          .append(that._selectedItem);
      })
    }
  }

  putElements() {
    const that = this;
    this.data.forEach(function(todo) {
      that._putElement(todo);
    });
    this._initializeContainerEvents();
  }

  updateUi(newItem) {
    this._putElement({...newItem});
  }

  update() {
    this.todoContainer.innerHTML = '';
    this.inProgressContainer.innerHTML = '';
    this.testingContainer.innerHTML = '';
    this.completeContainer.innerHTML = '';
    this.putElements();
  }

  _getCountComplete() {
    return this._getCount('completeContainer');
  }
  _getCountTodo() {
    const todoContainer = +this._getCount('todoContainer');
    const inProgressContainer = +this._getCount('inProgressContainer');
    const testingContainer = +this._getCount('testingContainer');
    const result = (todoContainer+inProgressContainer+testingContainer);
    return result;
  }

  _getCount(type) {
    return this.data.reduce((sum, el) => el.type === type ? sum += 1 : sum, 0);
  }

  updateData(type, id) {
    this.data.forEach((item) => {
      if ( item.id === id ) {
        item.type = type;
      }
    })
    localStorage.setItem('todoDataInfinBank', JSON.stringify(this.data))
    return this.updateResult();
  }

  updateResult() {
      const complete = this._getCountComplete() || 'No complete tasks';
      const todoList = this._getCountTodo() || 'no tasks';
      result.textContent = `${complete} done of ${todoList}`;
  }
}
const todo = new TodoApp();
todo.putElements();
todo.updateResult();

let dashboards = document.querySelectorAll('.dashboard-box');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if ( task.value.length <= 3 ) {
    return
  }
  const newItem = todo.createTask(task.value);
  todo.data.push(newItem);
  todo.updateUi(newItem);
  todo.updateLocalStorage();
  task.value = '';
})
