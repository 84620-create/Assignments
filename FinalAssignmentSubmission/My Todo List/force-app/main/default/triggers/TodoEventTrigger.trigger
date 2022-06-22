trigger TodoEventTrigger on Event_To_Do_Item__c(after insert, after update, after delete) {
    if(Trigger.isInsert){
        try{
            List<Event_To_Do_Item__c> eventItemList = Trigger.new;
            List<Event> newEventList = new List<Event>();
            for (Event_To_Do_Item__c eventRecord : eventItemList) {
                Event newEvent = new Event();
                newEvent.Task_Id__c = String.valueOf(eventRecord.id);
                newEvent.Subject = eventRecord.Subject__c;
                newEvent.Description = eventRecord.Description__c;
                newEvent.StartDateTime = eventRecord.Start_Date__c;
                newEvent.EndDateTime = eventRecord.End_Date__c;
                newEvent.WhatId = Id.valueOf(eventRecord.Related_ID__c);
                newEventList.add(newEvent);
            }
            insert newEventList;
        }catch(Exception e){
            AuraHandledException exce = new AuraHandledException(e.getMessage());
            throw exce;
        }
    }
    if(Trigger.isUpdate){
        try{
            List<Event_To_Do_Item__c> updatedEventList = Trigger.new;
            List<Event> newUpdatedEventList = new List<Event>();
            for(Event_To_Do_Item__c eventRecord : updatedEventList) {
                String eventRecordId = String.valueOf(eventRecord.id);
                Event updatedEvent = [SELECT Task_Id__c, Subject, Description, StartDateTime, EndDateTime, WhatId FROM Event Where Task_Id__c =: eventRecordId];
                updatedEvent.Subject = eventRecord.Subject__c;
                updatedEvent.Description = eventRecord.Description__c;
                updatedEvent.StartDateTime = eventRecord.Start_Date__c;
                updatedEvent.EndDateTime = eventRecord.End_Date__c;
                updatedEvent.WhatId = Id.valueOf(eventRecord.Related_ID__c);
                newUpdatedEventList.add(updatedEvent);
            }
            update newUpdatedEventList;
        }catch(Exception e){
            AuraHandledException exce = new AuraHandledException(e.getMessage());
            throw exce;
        }
    }
    if(Trigger.isDelete){
      try{
        List<Event_To_Do_Item__c> deletedEventRecordList = Trigger.old;
        List<String> eventRecordIDList = new List<String>();
        for (Event_To_Do_Item__c eventRecord : deletedEventRecordList) {
              String eventRecordId = String.valueOf(eventRecord.id);
          eventRecordIDList.add(eventRecordId);
  
        }
        List<Event> deletedEventList = [SELECT Task_Id__c, Subject, Description, StartDateTime, EndDateTime, WhatId FROM Event Where Task_Id__c IN : eventRecordIDList];
        delete deletedEventList;
      }catch(Exception e){
        AuraHandledException exce = new AuraHandledException(e.getMessage());
        throw exce;
      }
    }
  }