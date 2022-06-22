import { LightningElement, wire, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import taskSearch from '@salesforce/apex/TodoAppController.taskSearch';
import getTaskData from '@salesforce/apex/TodoAppController.getTaskData';
import { loadScript } from 'lightning/platformResourceLoader';
import HighCharts from '@salesforce/resourceUrl/HighCharts';
import getChartDataTask from '@salesforce/apex/TodoAppController.getChartDataTask';

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
  dataChartTaskDisplay = [];
  taskSubjectName = '';

  @api taskComponentReload() {
    this.fetchTaskData();
    this.fetchChartDataTask();
  }

  fetchTaskData() {
    getTaskData()
      .then((data) => {
        this.taskData = data;
      })
      .catch((error) => {
        console.log('Error is', this.error);
        const evt = new ShowToastEvent({
          title: 'Toast Error',
          message: 'Some unexpected error',
          variant: 'error',
          mode: 'dismissable'
        });
        this.dispatchEvent(evt);
      });
  }

  fetchChartDataTask() {
    getChartDataTask()
      .then((data) => {
        console.log('chart task data.. : ', data);
        let arr = [];
        Object.keys(data).forEach(key => {
          arr.push({ 'name': key, 'y': data[key] });
        });
        this.dataChartTaskDisplay = arr;
        console.log('dataChartTaskDisplay :', this.dataChartTaskDisplay);
        this.renderTaskData();
      })
      .catch((error) => {
        console.log('Task Error', error);
        const evt = new ShowToastEvent({
          title: 'Toast Error',
          message: 'Some unexpected error',
          variant: 'error',
          mode: 'dismissable'
        });
        this.dispatchEvent(evt);
      });
  }

  connectedCallback() {
    this.fetchTaskData();
    this.fetchChartDataTask();

    Promise.all([
      loadScript(this, HighCharts),

    ])
      .then((data) => {

      })
      .catch((error) => {
        console.log('Error is', this.error);
        const evt = new ShowToastEvent({
          title: 'Toast Error',
          message: 'Some unexpected error',
          variant: 'error',
          mode: 'dismissable'
        });
        this.dispatchEvent(evt);
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

  @wire(taskSearch, { subject: '$taskSubjectName' })
  searchTaskList({ error, data }) {
    if (data) {
      console.log('search data', data);
      this.taskData = data;
    }
    else if (error) {
      console.log('search error', error);
      const evt = new ShowToastEvent({
        title: 'Toast Error',
        message: 'Some unexpected error',
        variant: 'error',
        mode: 'dismissable'
      });
      this.dispatchEvent(evt);
    }

  }
  taskHandelKeyChange(event) {
    this.taskSubjectName = event.target.value;
  }
}