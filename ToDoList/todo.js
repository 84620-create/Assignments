window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");
	index=0;
    let ar=[];
	console.log(JSON.parse(localStorage.getItem('list')));
    if(JSON.parse(localStorage.getItem('list'))!=null){
	  ar=JSON.parse(localStorage.getItem('list'));
	  console.log(ar);
       for(let i of ar){
		const task_el = document.createElement('div');
		task_el.classList.add('task');
        task_el.id='task_'+index;
		index++;
		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = i;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';


		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);
		
		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				ar.splice(task_el.id.split('_')[1],1,task_input_el.value);
			    localStorage.setItem('list',JSON.stringify(ar));
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});
       	
		task_delete_el.addEventListener('click', (e) => {
			console.log(task_el);
			ar.splice(task_el.id.split('_')[1],1);
			localStorage.setItem('list',JSON.stringify(ar));
			list_el.removeChild(task_el);
		});

	   }
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;
        ar.push(input.value);
		localStorage.setItem('list',JSON.stringify(ar));
		//console.log(JSON.parse(localStorage.getItem('list')));
		const task_el = document.createElement('div');
		task_el.classList.add('task');
        task_el.id='task_'+index;
		index++;
		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';


		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = '';

     	task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				ar.splice(task_el.id.split('_')[1],1,task_input_el.value);
			    localStorage.setItem('list',JSON.stringify(ar));
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});
       	
		task_delete_el.addEventListener('click', (e) => {
			console.log(task_el);
			ar.splice(task_el.id.split('_')[1],1);
			localStorage.setItem('list',JSON.stringify(ar));
			list_el.removeChild(task_el);
		});
	});
});

