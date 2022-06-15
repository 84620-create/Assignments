import { LightningElement,track,api } from 'lwc';

import getTaskData from '@salesforce/apex/TodoAppController.getTaskData';
import chartDataTask from '@salesforce/apex/TodoAppController.chartDataTask';
import getEventData from '@salesforce/apex/TodoAppController.getEventData';
import chartDataEvent from '@salesforce/apex/TodoAppController.chartDataEvent';

//task form Tvent_To_Do_Item__c
import Task_Object from '@salesforce/schema/Task_To_Do_Item__c';
import Task_Subject from '@salesforce/schema/Task_To_Do_Item__c.Subject__c';
import Task_Description from '@salesforce/schema/Task_To_Do_Item__c.Description__c';
import Task_Due_Date from '@salesforce/schema/Task_To_Do_Item__c.Due_Date__c';
import Task_Assigned_To from '@salesforce/schema/Task_To_Do_Item__c.Assigned_To__c';
import Task_Related_Object from '@salesforce/schema/Task_To_Do_Item__c.Related_Object__c';
import Task_Related_ID from '@salesforce/schema/Task_To_Do_Item__c.Related_ID__c';
import Task_Status from '@salesforce/schema/Task_To_Do_Item__c.Status__c';

// event form Event_To_Do_Item__c
import Event_Object from '@salesforce/schema/Event_To_Do_Item__c';
import Event_Subject from '@salesforce/schema/Event_To_Do_Item__c.Subject__c';
import Event_Description from '@salesforce/schema/Event_To_Do_Item__c.Description__c';
import Event_Date__c from '@salesforce/schema/Event_To_Do_Item__c.Date__c';
import Event_Start_Date from '@salesforce/schema/Event_To_Do_Item__c.Start_Date__c';
import Event_End_Date from '@salesforce/schema/Event_To_Do_Item__c.End_Date__c';
import Attendees from '@salesforce/schema/Event_To_Do_Item__c.Attendees__c';
import Event_Related_Object from '@salesforce/schema/Event_To_Do_Item__c.Related_Object__c';
import Event_Related_ID from '@salesforce/schema/Event_To_Do_Item__c.Related_ID__c';
import Event_Status from '@salesforce/schema/Event_To_Do_Item__c.Status__c';

export default class Header extends LightningElement {

    @track isModalOpen = false;
    taskFields = [Task_Subject, Task_Description, Task_Due_Date, Task_Assigned_To, Task_Related_Object, Task_Related_ID, Task_Status];
  @track taskObjectApiName = Task_Object;

  eventFields = [Event_Subject, Event_Description, Event_Date__c, Event_Start_Date, Event_End_Date, Event_Related_Object, Attendees, Event_Related_ID, Event_Status];
  @track eventObjectApiName = Event_Object;


  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  submitDetails() {
    this.isModalOpen = false;
  }
  @track fieldValue = null;
  @track isTaskfield = false;
  @track isEventfield = false;

  handleChange(event) {
    this.fieldValue = event.target.value;
  }
  submit() {
    if (this.fieldValue == 'Task') {
      this.isTaskfield = true;
      console.log(this.isTaskfield);
    }
    if (this.fieldValue == 'Event') {
      this.isEventfield = true;
    }
    this.isModalOpen = false;
  }

  taskformclose() {
    this.isTaskfield = false;
  }
  eventformclose() {
    this.isEventfield = false;
  }
  taskFormSubmit() {
    this.template.querySelector('c-task-Component').taskComponentReload();
  }
  eventFormSubmit() {
    this.template.querySelector('c-event-Component').eventComponentReload();
  }
}
