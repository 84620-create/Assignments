import { LightningElement,wire,track,api } from 'lwc';
import taskSearch from '@salesforce/apex/TodoAppController.taskSearch';
import getTaskData from '@salesforce/apex/TodoAppController.getTaskData';
import { loadScript } from 'lightning/platformResourceLoader';
import HighCharts from '@salesforce/resourceUrl/HighCharts';
import chartDataTask from '@salesforce/apex/TodoAppController.chartDataTask';

const taskColumns = [
    { label: 'Subject', fieldName: 'Subject__c' },
    { label: 'Description', fieldName: 'Description__c' },
    { label: 'Due Date', fieldName: 'Due_Date__c' },
    { label: 'Assigned to (User)', fieldName: 'Assigned_To__c' },
    { label: 'Related Object', fieldName: 'Related_Object__c' },
    { label: 'Related Id', fieldName: 'Related_ID__c' },
    { label: 'Status', fieldName: 'Status__c' },
  ];
  

export default class TaskComponent extends LightningElement {

    @track taskData = [];
    taskColumns = taskColumns;
    
    dataChartTaskDisplay = {};

    taskSubjectName = 'Enter Subject Name';
  @wire(taskSearch,{subject :'$taskSubjectName'})
  searchTaskList({error,data}){
      if(data){
        console.log('search data',data);
          this.taskData =data;
      }
      else if(error){
        console.log('search error',error);
      }

  }
  taskHandelKeyChange(event){
    this.taskSubjectName = event.target.value;
}
timer;

@api taskComponentReload() {
  console.log('task submit');
  getTaskData()
    .then((data) => {
      this.taskData = data;
    })
    .catch((error) => {
      console.log('Error is', this.error);
    });

  chartDataTask()
    .then((data) => {
      console.log('task Chart Data',data);
      this.dataChartTaskDisplay = data;
      this.renderTaskData();
    })
    .catch((error) => {
      console.log('Task Error', error);
    });
}
connectedCallback() {
    getTaskData()
      .then((data) => {
        this.taskData = data;
      })
      .catch((error) => {
        console.log('Error is', this.error);
      });
    

    chartDataTask()
      .then((data) => {
        this.dataChartTaskDisplay = data;
        this.renderTaskData();
      })
      .catch((error) => {
        console.log('Task Error', error);
      });
    Promise.all([
      loadScript(this, HighCharts),

    ])
      .then((data) => {

      })
      .catch((error) => {
        console.log('Error is', this.error);
      });
  }
  
  renderTaskData() {
    console.log('Data123', this.dataChartTaskDisplay);
    let container = this.template.querySelector(".chartContainerTask");
    Highcharts.chart(container, {

      chart: {
        styledMode: true
      },

      title: {
        text: 'Date Wise tasks Count'
      },
      series: [{
        name: 'Count : ',
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y'],
        data: this.dataChartTaskDisplay,
      }]
    });
  }
}