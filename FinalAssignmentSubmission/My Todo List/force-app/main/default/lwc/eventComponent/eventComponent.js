import { LightningElement, wire,track, api } from 'lwc';
import getEventData from '@salesforce/apex/TodoAppController.getEventData';
// import taskSearch from '@salesforce/apex/TodoAppController.taskSearch';
import eventSearch from '@salesforce/apex/TodoAppController.eventSearch';
import { loadScript } from 'lightning/platformResourceLoader';
import HighCharts from '@salesforce/resourceUrl/HighCharts';
// import chartDataTask from '@salesforce/apex/TodoAppController.chartDataTask';
import chartDataEvent from '@salesforce/apex/TodoAppController.chartDataEvent';

const eventColumns = [
    { label: 'Subject', fieldName: 'Subject__c' },
    { label: 'Description', fieldName: 'Description__c' },
    { label: 'Date', fieldName: 'Date__c' },
    { label: 'Start Date', fieldName: 'Start_Date__c' },
    { label: 'End Date', fieldName: 'End_Date__c' },
    { label: 'Related Object', fieldName: 'Related_Object__c' },
    { label: 'Related Id', fieldName: 'Related_ID__c' },
    { label: 'Status', fieldName: 'Status__c' },
  ];

export default class EventComponent extends LightningElement {

    
    @track eventData = [];
    eventColumns = eventColumns;

    dataChartEventDisplay = {};

    eventSubjectName = 'Enter Subject Name';
    @wire(eventSearch,{subject :'$eventSubjectName'})
    searchEventList({error,data}){
      if(data){
        console.log('search data',data);
          this.eventData =data;
      }
      else if(error){
        console.log('search error',error);
    }
    }
    eventHandelKeyChange(event){
        this.eventSubjectName = event.target.value;
    }
  
    @api eventComponentReload() {
      console.log('event submit');
      getEventData()
        .then((data) => {
          this.eventData = data;
          console.log("inside event : ", this.eventData);
        })
        .catch((error) => {
          console.log('Error is', this.error);
        });
      chartDataEvent()
        .then((data) => {
          console.log('event Chart Data',data);
          this.dataChartEventDisplay = data;
          this.renderEventData();
        })
        .catch((error) => {
          console.log('event Error', error);
        });
  
    }
    connectedCallback() {
      getEventData()
        .then((data) => {
          this.eventData = data;
        })
        .catch((error) => {
          console.log('Error is', this.error);
        });
  
      chartDataEvent()
        .then((data) => {
          this.dataChartEventDisplay = data;
          this.renderEventData();
        })
        .catch((error) => {
          console.log('event Error', error);
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

    renderEventData() {
        console.log('Data45', this.dataChartEventDisplay);
        let container = this.template.querySelector(".chartContainerEvent");
        Highcharts.chart(container, {
    
          chart: {
            styledMode: true
          },
    
          title: {
            text: 'Date Wise Events Count'
          },
          series: [{
            name : 'Count',
            type: 'pie',
            allowPointSelect: true,
            keys: ['name', 'y'],
            data: this.dataChartEventDisplay,
          }]
        });
      }
}