
public class TodoAppController {
  @AuraEnabled
  public static List<Task_To_Do_Item__c> getTaskData() {
    List<Task_To_Do_Item__c> taskRecordList = new List<Task_To_Do_Item__c>();
    try {
      taskRecordList = [SELECT Subject__c, Description__c, Due_Date__c, Assigned_To__c, Related_Object__c, Related_ID__c, Status__c FROM Task_To_Do_Item__c];
    }catch(Exception e){
      AuraHandledException exce = new AuraHandledException(e.getMessage());
      throw exce;
    }
    return taskRecordList;
  }
  @AuraEnabled
  public static List<Event_To_Do_Item__c> getEventData() {
    List<Event_To_Do_Item__c> eventRecordList = new List<Event_To_Do_Item__c>();
    try {
      eventRecordList = [SELECT Subject__c, Description__c, Date__c, Start_Date__c, End_Date__c, Related_Object__c, Related_ID__c, Status__c FROM Event_To_Do_Item__c];
    }catch(Exception e){
      AuraHandledException exce = new AuraHandledException(e.getMessage());
      throw exce;
    }
    return eventRecordList;
  }

  @AuraEnabled
  public static Map<Date,Integer> getChartDataTask(){
    Map<Date,Integer> taskChartDataValues = new Map<Date,Integer>();
    List<AggregateResult> taskDateCount  =[SELECT count(Id) cnt, Due_Date__c FROM Task_To_Do_Item__c group by Due_Date__c];
    for(Integer i = 0; i < taskDateCount.size(); i++){
      try{
        taskChartDataValues.put(Date.valueOf(taskDateCount[i].get('Due_Date__c')),Integer.valueOf(taskDateCount[i].get('cnt')));        
      }catch(Exception e){
        AuraHandledException exce = new AuraHandledException(e.getMessage());
        throw exce;
      }
    }
    return taskChartDataValues;
  }
  
  @AuraEnabled
  public static Map<Date,Integer> getChartDataEvent(){
    Map<Date,Integer> eventChartDataValues = new  Map<Date,Integer>();
    List<AggregateResult> eventDateCount  = [SELECT count(Id) cnt, Date__c FROM Event_To_Do_Item__c group by Date__c];
    for(Integer i = 0; i < eventDateCount.size(); i++){
      try{
        eventChartDataValues.put(Date.valueOf(eventDateCount[i].get('Date__c')),Integer.valueOf(eventDateCount[i].get('cnt')));
      }catch(Exception e){
        AuraHandledException exce = new AuraHandledException(e.getMessage());
        throw exce;
      }
    }
    return eventChartDataValues;
  }
  
  
  @AuraEnabled(cacheable = true)
  public static List<Task_To_Do_Item__c> taskSearch(String subject){
    List<Task_To_Do_Item__c> taskRecordList = new List<Task_To_Do_Item__c>();
    // subject = 'new';
    if(subject.length() != 0){
      String subjectKey = '%' + subject + '%';
      try{
        taskRecordList = [SELECT Subject__c, Description__c, Due_Date__c, Assigned_To__c, Related_Object__c, Related_ID__c, Status__c FROM Task_To_Do_Item__c where Subject__c LIKE: subjectKey];
        return taskRecordList;
      }catch(Exception e){
        AuraHandledException exce = new AuraHandledException(e.getMessage());
        throw exce;
      }
    }
    else{
      return getTaskData();
    }
  }
  
  @AuraEnabled(cacheable = true)
  public static List < Event_To_Do_Item__c > eventSearch(String subject){
    List<Event_To_Do_Item__c> eventRecordList = new List<Event_To_Do_Item__c>();
    // subject = 'new';
    if(subject.length() != 0){
      String subjectKey = '%' + subject + '%';
      try{
        eventRecordList = [SELECT Subject__c, Description__c, Date__c, Start_Date__c, End_Date__c, Related_Object__c, Related_ID__c, Status__c FROM Event_To_Do_Item__c where Subject__c LIKE: subjectKey];
        return eventRecordList;
      }catch(Exception e){
        AuraHandledException exce = new AuraHandledException(e.getMessage());
        throw exce;
      }
    }
    else{
      return getEventData();
    } 
  }
  }