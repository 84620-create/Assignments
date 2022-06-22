import { LightningElement, wire, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getEventData from '@salesforce/apex/TodoAppController.getEventData';
import eventSearch from '@salesforce/apex/TodoAppController.eventSearch';
import { loadScript } from 'lightning/platformResourceLoader';
import HighCharts from '@salesforce/resourceUrl/HighCharts';
import getChartDataEvent from '@salesforce/apex/TodoAppController.getChartDataEvent';

const Columns = [
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
  eventColumns = Columns;
  displayDataChart = {};
  subjectName = '';

  @api eventComponentReload() {
    console.log('event submit fire');
    this.fetchEventData()
    this.fetchChartDataEvent();

  }
  fetchEventData() {
    getEventData()
      .then((data) => {
        this.eventData = data;
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
  fetchChartDataEvent() {
    getChartDataEvent()
      .then((data) => {
        let arr = [];
        Object.keys(data).forEach(key => {
          arr.push({ 'name': key, 'y': data[key] });
        });
        this.displayDataChart = arr;
        this.renderEventData();
      })
      .catch((error) => {
        console.log('event Error', error);
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
    this.fetchEventData()
    this.fetchChartDataEvent();

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

  renderEventData() {
    console.log('Data45', this.displayDataChart);
    let container = this.template.querySelector(".chartContainerEvent");
    Highcharts.chart(container, {

      chart: {
        styledMode: true
      },

      title: {
        text: 'Date Wise Events Count'
      },
      series: [{
        name: 'Count',
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y'],
        data: this.displayDataChart,
      }]
    });
  }

  @wire(eventSearch, { subject: '$subjectName' })
  searchEventList({ error, data }) {
    if (data) {
      console.log('search data', data);
      this.eventData = data;
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
  eventHandelKeyChange(event) {
    this.subjectName = event.target.value;
  }
}
