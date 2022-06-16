trigger TodoEventTrigger on Event_To_Do_Item__c (after insert, after update, after delete) {
    if(Trigger.isInsert){
    List<Event_To_Do_Item__c> eventItemList = Trigger.new;
    Event newEvent = new Event();
    for(Event_To_Do_Item__c eventRecord : eventItemList){
    	newEvent.Task_Id__c = String.valueOf(eventRecord.id);
       	newEvent.Subject = eventRecord.Subject__c;
    	newEvent.Description = eventRecord.Description__c;
    	newEvent.StartDateTime = eventRecord.Start_Date__c;
    	newEvent.EndDateTime = eventRecord.End_Date__c;
    	newEvent.WhatId = Id.valueOf(eventRecord.Related_ID__c);
    }
    insert newEvent;
    }
    if(Trigger.isUpdate){
        List<Event_To_Do_Item__c> newEventToDoItemList = Trigger.new;
        
        for(Event_To_Do_Item__c eventRecord : newEventToDoItemList){
           String tempEventRecord = String.valueOf(eventRecord.id);
        	Event newEvent = [SELECT Task_Id__c, Subject, Description, StartDateTime, EndDateTime,WhatId FROM Event Where Task_Id__c =: tempEventRecord];
                     newEvent.Subject = eventRecord.Subject__c;
    				 newEvent.Description = eventRecord.Description__c;
    				 newEvent.StartDateTime = eventRecord.Start_Date__c;
   					 newEvent.EndDateTime = eventRecord.End_Date__c;
   					 newEvent.WhatId = Id.valueOf(eventRecord.Related_ID__c);
            update newEvent;
        }
    }
        if(Trigger.isDelete){
            try{
                List<Event_To_Do_Item__c> deleteEventToDoItemList = Trigger.old;
        		for(Event_To_Do_Item__c eventRecord : deleteEventToDoItemList){
          		String tempEventRecord = String.valueOf(eventRecord.id);
        		Event newEvent = [SELECT Task_Id__c, Subject, Description, StartDateTime, EndDateTime,WhatId FROM Event Where Task_Id__c =: tempEventRecord];
            	delete newEvent;
                }
            }catch(Exception e){
                       System.debug('chartDataTask Error '+e.getMessage());
            }
     }
}