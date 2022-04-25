let studentData = [
    { rollNo: 1, name: 'Sam', age: 21, branch: 'CSE', year: '4th' },
    { rollNo: 2, name: 'John', age: 20, branch: 'IT', year: '4th' },
    { rollNo: 3, name: 'Cary', age: 22, branch: 'EC', year: '4th' },
    { rollNo: 4, name: 'Alex', age: 20, branch: 'CSE', year: '4th' },
    { rollNo: 5, name: 'David', age: 23, branch: 'IT', year: '4th' },
    { rollNo: 6, name: 'Johny', age: 22, branch: 'CSE', year: '4th' },
    { rollNo: 7, name: 'Smith', age: 21, branch: 'EC', year: '4th' },
    { rollNo: 8, name: 'Danial', age: 19, branch: 'IT', year: '4th' },
    { rollNo: 9, name: 'Fragrance', age: 21, branch: 'CSE', year: '4th' },
    { rollNo: 10, name: 'Luis', age: 20, branch: 'IT', year: '4th' }

];

let data = document.querySelector("tbody");
for (let student of studentData) {
    const row = document.createElement("tr");
    const column1 = document.createElement("td");
    const column2 = document.createElement("td");
    const column3 = document.createElement("td");
    const column4 = document.createElement("td");
    const column5 = document.createElement("td");
    column1.textContent = student.rollNo;
    column2.textContent = student.name;
    column3.textContent = student.age;
    column4.textContent = student.branch;
    column5.textContent = student.year;
    row.appendChild(column1);
    row.appendChild(column2);
    row.appendChild(column3);
    row.appendChild(column4);
    row.appendChild(column5);
    data.appendChild(row);
}

function clicked(event) {
    console.log(event.target.textContent);
}