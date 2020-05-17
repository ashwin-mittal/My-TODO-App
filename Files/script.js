const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

update_list()

function clearTodo() {
  const obj = JSON.parse(window.localStorage.getItem("TODO"));
  if (obj === null) {
    return
  }
  else {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      delete obj[key]
    }
    window.localStorage.setItem("TODO", JSON.stringify(obj))
    update_list()
  }
}

function newTodo() {
  let task = ''
  while (task === '') {
    task = prompt('Please enter your task: ')
  }
  if (task === null) {
    return
  }
  let obj = JSON.parse(window.localStorage.getItem("TODO"));
  if (obj === null) {
    obj = {}
  }
  obj[task] = false
  window.localStorage.setItem("TODO", JSON.stringify(obj))
  update_list()
}

function update_list() {
  const obj = JSON.parse(window.localStorage.getItem("TODO"));
  if (obj === null) {
    return
  }
  else {
    list.innerHTML = ''
    const keys = Object.keys(obj)
    let tot = keys.length, checked = 0
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const item = document.createElement('li')
      const box = document.createElement('input')
      const text = document.createElement('span')
      const but = document.createElement('button')
      item.setAttribute('class', classNames.TODO_ITEM)
      box.setAttribute('class', classNames.TODO_CHECKBOX)
      box.setAttribute('type', 'checkbox')
      box.setAttribute('onClick', "checkTodo('" + key + "')")
      but.setAttribute('class', classNames.TODO_DELETE)
      but.setAttribute('type', 'button')
      but.setAttribute('onClick', "deleteTodo('" + key + "')")
      text.innerHTML = key
      but.innerHTML = 'DELETE'
      if (obj[key] === true) {
        checked++
        box.checked = true
      }
      item.appendChild(box)
      // item.innerHTML += 'String'
      item.appendChild(text)
      item.appendChild(but)
      list.appendChild(item)
    }
    itemCountSpan.innerHTML = tot
    uncheckedCountSpan.innerHTML = tot - checked
  }
}

function deleteTodo(element) {
  const obj = JSON.parse(window.localStorage.getItem("TODO"))
  delete obj[element]
  window.localStorage.setItem("TODO", JSON.stringify(obj))
  update_list()
}

function updateCheck() {
  const obj = JSON.parse(window.localStorage.getItem("TODO"));
  if (obj === null) {
    return
  }
  else {
    const keys = Object.keys(obj)
    let tot = keys.length, checked = 0
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (obj[key] === true) {
        checked++;
      }
    }
    itemCountSpan.innerHTML = tot
    uncheckedCountSpan.innerHTML = tot - checked
  }
}

function checkTodo(element) {
  const obj = JSON.parse(window.localStorage.getItem("TODO"))
  obj[element] = !obj[element]
  window.localStorage.setItem("TODO", JSON.stringify(obj))
  updateCheck()
}