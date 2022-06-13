public class taskItemList {
    
    @AuraEnabled
    public static List<Task_To_Do_Item__c> displayTaskData(){
        List<Task_To_Do_Item__c> taskRecordList = new List<Task_To_Do_Item__c>();
        try{
            taskRecordList = [SELECT Subject__c, Description__c, Due_Date__c, Assigned_To__c, Related_Object__c, Related_ID__c, Status__c FROM Task_To_Do_Item__c];           
        }catch(Exception e){
                   System.debug('taskRecordList Error ' + e.getMessage());
        }
        return taskRecordList;
    } 
    @AuraEnabled
    public static List<Event_To_Do_Item__c> displayEventData(){
            List<Event_To_Do_Item__c> eventRecordList = new List<Event_To_Do_Item__c>();
        try{
            eventRecordList = [SELECT Subject__c, Description__c, Date__c, Start_Date__c, End_Date__c, Attendees__c, Related_Object__c, Related_ID__c, Status__c FROM Event_To_Do_Item__c];
        }catch(Exception e){
                   System.debug('eventRecordList Error '+e.getMessage());
        }
        return eventRecordList;
    } 

    public class ChartClass {
        @AuraEnabled
        public String name {get; set;}
        @AuraEnabled
        public Decimal y {get; set;}
    } 

    @AuraEnabled
    public static List<ChartClass> chartDataTask(){
        List<ChartClass>  taskDataValues = new List<ChartClass>();
        List<AggregateResult> taskDateCount  = [SELECT count(Id), Due_Date__c FROM Task_To_Do_Item__c group by Due_Date__c] ;

        for(Integer i=0; i < taskDateCount.size(); i++){
            try{
                ChartClass taskPiedata = new ChartClass();
                taskPiedata.name = String.valueOf(taskDateCount[i].get('Due_Date__c'));
                taskPiedata.y = Integer.valueOf(taskDateCount[i].get('expr0'));
                taskDataValues.add(taskPiedata);
            }catch(Exception e){
                       System.debug('chartDataTask Error '+e.getMessage());
            }
        }     
        return taskDataValues;         

    }

    @AuraEnabled
    public static List<ChartClass> chartDataEvent(){
        List<ChartClass> eventDataValues = new List<ChartClass>();
        List<AggregateResult> eventDateCount  = [SELECT count(Id), Date__c FROM Event_To_Do_Item__c group by Date__c ] ;

        for(Integer i=0; i < eventDateCount.size(); i++){
            try{
                ChartClass eventPiedata = new ChartClass();
                eventPiedata.name = String.valueOf(eventDateCount[i].get('Date__c'));
                eventPiedata.y = Integer.valueOf(eventDateCount[i].get('expr0'));
                eventDataValues.add(eventPiedata);
            }catch(Exception e){
                       System.debug('chartDataEvent Error '+e.getMessage());
            }
        }     
        return eventDataValues;         

    }


    @AuraEnabled(cacheable=true)
    public static List<Task_To_Do_Item__c> taskSearch(String subject){
        List<Task_To_Do_Item__c> taskItemList = new List<Task_To_Do_Item__c>();
        // subject = 'new';
        if(subject.length()!=0){
            String subjectKey = '%'+subject+'%';
        try {

            taskItemList = [SELECT Subject__c, Description__c, Due_Date__c, Assigned_To__c, Related_Object__c, Related_ID__c, Status__c FROM Task_To_Do_Item__c where Subject__c LIKE:subjectKey];
            return taskItemList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
       }

        }
        else {
           return  displayTaskData();
        }
        
    }

    @AuraEnabled(cacheable=true)
    public static List<Event_To_Do_Item__c> eventSearch(String subject){
        List<Event_To_Do_Item__c> eventItemList = new List<Event_To_Do_Item__c>();
        // subject = 'new';
        if(subject.length()!=0){
            String subjectKey = '%'+subject+'%';
        try {

            eventItemList = [SELECT Subject__c, Description__c, Date__c, Start_Date__c, End_Date__c, Attendees__c, Related_Object__c, Related_ID__c, Status__c FROM Event_To_Do_Item__c where Subject__c LIKE:subjectKey];
            return eventItemList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
       }

        }
        else {
           return  displayEventData();
        }
        
    }
}