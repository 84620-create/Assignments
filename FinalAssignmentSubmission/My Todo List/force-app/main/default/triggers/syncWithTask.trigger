trigger syncWithTask on Task_To_Do_Item__c (after insert,after update) {
    if(Trigger.isInsert){
      Task_To_Do_Item__c taskItem = [SELECT Id, Subject__c, Description__c, Due_Date__c,Related_ID__c, Status__c FROM Task_To_Do_Item__c Where Id IN : Trigger.new];
      Task newTask = new Task();
      newTask.Subject = taskItem.Subject__c;
      newTask.Description = taskItem.Description__c;
      newTask.ActivityDate = taskItem.Due_Date__c;
      newTask.Status = taskItem.Status__c;
      newTask.WhatId = Id.valueOf(taskItem.Related_ID__c);
      insert newTask;
  }
   
}