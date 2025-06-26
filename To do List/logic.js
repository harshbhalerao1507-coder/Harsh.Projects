
const todo=[]
render()
function add(){
    
    const tododelem=document.querySelector('.task')
    const tododate=document.querySelector('.date')
    let date=tododate.value
    let name=tododelem.value;
    
    todo.push({
        name:name,
        date:date
    })
    
    
    
    tododelem.value=''
    tododate.value=''
    render()
}
function render(){
let todoHTML=''

for(let i=0;i<todo.length;i++){
const Todotask=todo[i]
const name=Todotask.name
const date=Todotask.date
const html=`
<div class="grid-format">
<div class="task">${name}</div>
<div class="date"> ${date}</div>
<button onclick="todo.splice(${i},1)
    render()"
    class="delete-button">delete
    </button>
    </div>
   </div> `
todoHTML+=html
}
document.querySelector('.show').
innerHTML=todoHTML
}
