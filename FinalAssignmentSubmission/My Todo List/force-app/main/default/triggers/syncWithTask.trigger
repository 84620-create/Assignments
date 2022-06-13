trigger syncWithTask on Task_To_Do_Item__c (after insert,after update,after delete) {
  if(Trigger.isInsert){
      try{
          List<Task_To_Do_Item__c> taskItemList = Trigger.new;
        Task newTask = new Task();
        for(Task_To_Do_Item__c taskRecord : taskItemList){
            newTask.Task_Id__c = String.valueOf(taskRecord.id);
          newTask.Subject = taskRecord.Subject__c;
          newTask.Description = taskRecord.Description__c;
          newTask.ActivityDate = taskRecord.Due_Date__c;
          newTask.Status = taskRecord.Status__c;
          newTask.WhatId = Id.valueOf(taskRecord.Related_ID__c);
        }
        insert newTask;
          }catch(Exception e){
                     System.debug('Insert trigger Error '+e.getMessage());
          }
    
  }
  if(Trigger.isUpdate){
    try{
        List<Task_To_Do_Item__c> newTaskToDoItemList = Trigger.new;
        for(Task_To_Do_Item__c taskRecord : newTaskToDoItemList){
            String tempId = String.valueOf(taskRecord.id);
            Task newTask = [SELECT Task_Id__c , Subject, Description, ActivityDate, WhatId FROM Task Where Task_Id__c =: tempId];
            newTask.Subject = taskRecord.Subject__c;
        newTask.Description = taskRecord.Description__c;
          newTask.ActivityDate = taskRecord.Due_Date__c;
         newTask.WhatId = Id.valueOf(taskRecord.Related_ID__c);
          
            update newTask;
        }
    }catch(Exception e){
           System.debug('Update trigger Error'+e.getMessage());
    } 
 }  
  if(Trigger.isDelete){
      try{
    List<Task_To_Do_Item__c> newTaskToDoItemList = Trigger.old;
        for(Task_To_Do_Item__c taskRecord : newTaskToDoItemList){
            String taskRecordId = String.valueOf(taskRecord.id);
            Task oldTask = [SELECT Task_Id__c , Subject, Description, ActivityDate, WhatId FROM Task Where Task_Id__c =: taskRecordId];
            delete oldTask;
        }
      }catch(Exception e){
                System.debug('Delete trigger Error'+e.getMessage());
      }
  }  
}