trigger TodoTaskTrigger on Task_To_Do_Item__c(after insert, after update, after delete) {
  if (Trigger.isInsert) {
    try {
      List<Task_To_Do_Item__c> newTaskItemList = Trigger.new;
      List<Task> newTaskList = new List <Task> ();
      for (Task_To_Do_Item__c taskRecord : newTaskItemList) {
        Task newTask = new Task();
        newTask.Task_Id__c = String.valueOf(taskRecord.id);
        newTask.Subject = taskRecord.Subject__c;
        newTask.Description = taskRecord.Description__c;
        newTask.ActivityDate = taskRecord.Due_Date__c;
        newTask.Status = taskRecord.Status__c;
        newTask.WhatId = Id.valueOf(taskRecord.Related_ID__c);
        newTaskList.add(newTask);
      }
      insert newTaskList;
    } catch (Exception e) {
      AuraHandledException exce = new AuraHandledException(e.getMessage());
      throw exce;
    }

  }
  if (Trigger.isUpdate) {
    try {
      List<Task_To_Do_Item__c> updatedTaskList = Trigger.new;
      List<Task> newUpdatedTaskList = new List<Task>();
      for(Task_To_Do_Item__c taskRecord : updatedTaskList) {
        String taskRecordId = String.valueOf(taskRecord.id);
        Task updatedTask = [SELECT Task_Id__c, Subject, Description, ActivityDate, WhatId FROM Task Where Task_Id__c =: taskRecordId];
        updatedTask.Subject = taskRecord.Subject__c;
        updatedTask.Description = taskRecord.Description__c;
        updatedTask.ActivityDate = taskRecord.Due_Date__c;
        updatedTask.WhatId = Id.valueOf(taskRecord.Related_ID__c);

        newUpdatedTaskList.add(updatedTask);
      }
      update newUpdatedTaskList;
    } catch(Exception e){
      AuraHandledException exce = new AuraHandledException(e.getMessage());
      throw exce;
    }
  }
  if (Trigger.isDelete){
    try{
      List<Task_To_Do_Item__c> deletedTaskRecordList = Trigger.old;
      List<String> taskRecordIdList = new List<String>();
      for(Task_To_Do_Item__c taskRecord : deletedTaskRecordList) {
        String taskRecordId = String.valueOf(taskRecord.id);
        taskRecordIdList.add(taskRecordId);
      }
      List<Task> deleteTaskList = [SELECT Task_Id__c, Subject, Description, ActivityDate, WhatId FROM Task Where Task_Id__c IN : taskRecordIdList];
      delete deleteTaskList;  
    }catch(Exception e){
      AuraHandledException exce = new AuraHandledException(e.getMessage());
      throw exce;
    }
  }
}