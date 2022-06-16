import { LightningElement, track,wire } from 'lwc';
// import getTaskData from '@salesforce/apex/TodoAppController.getTaskData';
// import getEventData from '@salesforce/apex/TodoAppController.getEventData';
// import taskSearch from '@salesforce/apex/TodoAppController.taskSearch';
// import eventSearch from '@salesforce/apex/TodoAppController.eventSearch';
// import { loadScript } from 'lightning/platformResourceLoader';
// import HighCharts from '@salesforce/resourceUrl/HighCharts';
// import chartDataTask from '@salesforce/apex/TodoAppController.chartDataTask';
// import chartDataEvent from '@salesforce/apex/TodoAppController.chartDataEvent';

// //task form Tvent_To_Do_Item__c
// import Task_Object from '@salesforce/schema/Task_To_Do_Item__c';
// import Task_Subject from '@salesforce/schema/Task_To_Do_Item__c.Subject__c';
// import Task_Description from '@salesforce/schema/Task_To_Do_Item__c.Description__c';
// import Task_Due_Date from '@salesforce/schema/Task_To_Do_Item__c.Due_Date__c';
// import Task_Assigned_To from '@salesforce/schema/Task_To_Do_Item__c.Assigned_To__c';
// import Task_Related_Object from '@salesforce/schema/Task_To_Do_Item__c.Related_Object__c';
// import Task_Related_ID from '@salesforce/schema/Task_To_Do_Item__c.Related_ID__c';
// import Task_Status from '@salesforce/schema/Task_To_Do_Item__c.Status__c';

// // event form Event_To_Do_Item__c
// import Event_Object from '@salesforce/schema/Event_To_Do_Item__c';
// import Event_Subject from '@salesforce/schema/Event_To_Do_Item__c.Subject__c';
// import Event_Description from '@salesforce/schema/Event_To_Do_Item__c.Description__c';
// import Event_Date__c from '@salesforce/schema/Event_To_Do_Item__c.Date__c';
// import Event_Start_Date from '@salesforce/schema/Event_To_Do_Item__c.Start_Date__c';
// import Event_End_Date from '@salesforce/schema/Event_To_Do_Item__c.End_Date__c';
// import Attendees from '@salesforce/schema/Event_To_Do_Item__c.Attendees__c';
// import Event_Related_Object from '@salesforce/schema/Event_To_Do_Item__c.Related_Object__c';
// import Event_Related_ID from '@salesforce/schema/Event_To_Do_Item__c.Related_ID__c';
// import Event_Status from '@salesforce/schema/Event_To_Do_Item__c.Status__c';

// const taskColumns = [
//   { label: 'Subject', fieldName: 'Subject__c' },
//   { label: 'Description', fieldName: 'Description__c' },
//   { label: 'Due Date', fieldName: 'Due_Date__c' },
//   { label: 'Assigned to (User)', fieldName: 'Assigned_To__c' },
//   { label: 'Related Object', fieldName: 'Related_Object__c' },
//   { label: 'Related Id', fieldName: 'Related_ID__c' },
//   { label: 'Status', fieldName: 'Status__c' },
// ];

// const eventColumns = [
//   { label: 'Subject', fieldName: 'Subject__c' },
//   { label: 'Description', fieldName: 'Description__c' },
//   { label: 'Date', fieldName: 'Date__c' },
//   { label: 'Start Date', fieldName: 'Start_Date__c' },
//   { label: 'End Date', fieldName: 'End_Date__c' },
//   { label: 'Attendees', fieldName: 'Attendees__c', type: 'id' },
//   { label: 'Related Object', fieldName: 'Related_Object__c' },
//   { label: 'Related Id', fieldName: 'Related_ID__c' },
//   { label: 'Status', fieldName: 'Status__c' },
// ];

export default class ToDoList extends LightningElement {

  // @track isModalOpen = false;

  // @track taskData = [];
  // taskColumns = taskColumns;

  // @track eventData = [];
  // eventColumns = eventColumns;

  // dataChartTaskDisplay = {};
  // dataChartEventDisplay = {};

  // taskFields = [Task_Subject, Task_Description, Task_Due_Date, Task_Assigned_To, Task_Related_Object, Task_Related_ID, Task_Status];
  // @track taskObjectApiName = Task_Object;

  // eventFields = [Event_Subject, Event_Description, Event_Date__c, Event_Start_Date, Event_End_Date, Event_Related_Object, Attendees, Event_Related_ID, Event_Status];
  // @track eventObjectApiName = Event_Object;


  // openModal() {
  //   this.isModalOpen = true;
  // }
  // closeModal() {
  //   this.isModalOpen = false;
  // }
  // submitDetails() {
  //   this.isModalOpen = false;
  // }
  // @track fieldValue = null;
  // @track isTaskfield = false;
  // @track isEventfield = false;

  // handleChange(event) {
  //   this.fieldValue = event.target.value;
  // }
  // submit() {
  //   if (this.fieldValue == 'Task') {
  //     this.isTaskfield = true;
  //     console.log(this.isTaskfield);
  //   }
  //   if (this.fieldValue == 'Event') {
  //     this.isEventfield = true;
  //   }
  //   this.isModalOpen = false;
  // }

  // taskformclose() {
  //   this.isTaskfield = false;
  // }
  // eventformclose() {
  //   this.isEventfield = false;
  // }

  // taskSubmit() {
  //   console.log('task submit');
  //   getTaskData()
  //     .then((data) => {
  //       this.taskData = data;
  //     })
  //     .catch((error) => {
  //       console.log('Error is', this.error);
  //     });

  //   chartDataTask()
  //     .then((data) => {
  //       console.log('task Chart Data',data);
  //       this.dataChartTaskDisplay = data;
  //       this.renderTaskData();
  //     })
  //     .catch((error) => {
  //       console.log('Task Error', error);
  //     });
  // }
  // eventSubmit() {
  //   console.log('event submit');
  //   getEventData()
  //     .then((data) => {
  //       this.eventData = data;
  //       console.log("inside event : ", this.eventData);
  //     })
  //     .catch((error) => {
  //       console.log('Error is', this.error);
  //     });
  //   chartDataEvent()
  //     .then((data) => {
  //       console.log('event Chart Data',data);
  //       this.dataChartEventDisplay = data;
  //       this.renderEventData();
  //     })
  //     .catch((error) => {
  //       console.log('event Error', error);
  //     });

  // }

  // eventSubjectName = 'Enter Subject Name';
  // taskSubjectName = 'Enter Subject Name';
  // @wire(taskSearch,{subject :'$taskSubjectName'})
  // searchTaskList({error,data}){
  //     if(data){
  //       console.log('search data',data);
  //         this.taskData =data;
  //     }
  //     else if(error){
  //       console.log('search error',error);
  //     }

  // }
  // @wire(eventSearch,{subject :'$eventSubjectName'})
  // searchEventList({error,data}){
  //     if(data){
  //       console.log('search data',data);
  //         this.eventData =data;
  //     }
  //     else if(error){
  //       console.log('search error',error);
  //     }

  // }
//   taskHandelKeyChange(event){
//     this.taskSubjectName = event.target.value;
// }
  // eventHandelKeyChange(event){
  //     this.eventSubjectName = event.target.value;
  // }

  // connectedCallback() {
  //   getTaskData()
  //     .then((data) => {
  //       this.taskData = data;
  //     })
  //     .catch((error) => {
  //       console.log('Error is', this.error);
  //     });
  //   getEventData()
  //     .then((data) => {
  //       this.eventData = data;
  //     })
  //     .catch((error) => {
  //       console.log('Error is', this.error);
  //     });

  //   chartDataTask()
  //     .then((data) => {
  //       this.dataChartTaskDisplay = data;
  //       this.renderTaskData();
  //     })
  //     .catch((error) => {
  //       console.log('Task Error', error);
  //     });
  //   chartDataEvent()
  //     .then((data) => {
  //       this.dataChartEventDisplay = data;
  //       this.renderEventData();
  //     })
  //     .catch((error) => {
  //       console.log('event Error', error);
  //     });

  //   Promise.all([
  //     loadScript(this, HighCharts),

  //   ])
  //     .then((data) => {

  //     })
  //     .catch((error) => {
  //       console.log('Error is', this.error);
  //     });
  // }
  
  // renderTaskData() {
  //   console.log('Data123', this.dataChartTaskDisplay);
  //   let container = this.template.querySelector(".chartContainerTask");
  //   Highcharts.chart(container, {

  //     chart: {
  //       styledMode: true
  //     },

  //     title: {
  //       text: 'Summary'
  //     },
  //     series: [{
  //       type: 'pie',
  //       allowPointSelect: true,
  //       keys: ['name', 'y'],
  //       data: this.dataChartTaskDisplay,
  //     }]
  //   });
  // }
  // renderEventData() {
  //   console.log('Data45', this.dataChartEventDisplay);
  //   let container = this.template.querySelector(".chartContainerEvent");
  //   Highcharts.chart(container, {

  //     chart: {
  //       styledMode: true
  //     },

  //     title: {
  //       text: 'Summary'
  //     },
  //     series: [{
  //       type: 'pie',
  //       allowPointSelect: true,
  //       keys: ['name', 'y'],
  //       data: this.dataChartEventDisplay,
  //     }]
  //   });
  // }
}
