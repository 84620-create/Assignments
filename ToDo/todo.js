let addNewToDo = document.getElementById('btn');
let toDo = document.getElementById('newtodo');
let input = document.getElementById('input');

addNewToDo.addEventListener('click', (e) =>{
    
    if(input.value != ""){
        e.preventDefault();
        let heading = document.createElement('h');
        console.log(input.value)
        heading.classList.add('leftdiv');
        heading.innerText = input.value;
        
        let button = document.createElement('button');
        button.classList.add('delete');
        button.innerText = "Delete";

        let newdiv = document.createElement('div');
        newdiv.appendChild(heading);
        newdiv.appendChild(button);

        toDo.appendChild(newdiv);
        input.value = "";

        heading.addEventListener('click', function(){
            heading.style.textDecoration = "line-through";
        });

        button.addEventListener('click', function(){
                    toDo.removeChild(newdiv); 
        });
    }
    else{
        alert("Please fill your task...");
    }
});