trigger syncWithEvent on Event_To_Do_Item__c (after insert) {
	Event_To_Do_Item__c eventItem = [SELECT Id, Subject__c, Description__c, Start_Date__c, End_Date__c,Related_ID__c, Status__c FROM Event_To_Do_Item__c Where Id IN : Trigger.new];
    Event newEvent = new Event();
    newEvent.Subject = eventItem.Subject__c;
    newEvent.Description = eventItem.Description__c;
    newEvent.StartDateTime = eventItem.Start_Date__c;
    newEvent.EndDateTime = eventItem.End_Date__c;
    newEvent.WhatId = Id.valueOf(eventItem.Related_ID__c);
    insert newEvent;
}