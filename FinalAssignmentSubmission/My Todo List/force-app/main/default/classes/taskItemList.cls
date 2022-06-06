public class taskItemList {
    
    @AuraEnabled
    public static List<Task_To_Do_Item__c> displayTaskData(){

        List<Task_To_Do_Item__c> taskItem = [SELECT Subject__c, Description__c, Due_Date__c, Assigned_To__c, Related_Object__c, Related_ID__c, Status__c FROM Task_To_Do_Item__c];
        return taskItem;
    } 
    @AuraEnabled
    public static List<Event_To_Do_Item__c> displayEventData(){

        List<Event_To_Do_Item__c> eventItem = [SELECT Subject__c, Description__c, Date__c, Start_Date__c, End_Date__c, Attendees__c, Related_Object__c, Related_ID__c, Status__c FROM Event_To_Do_Item__c];
        return eventItem;
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
            ChartClass taskPiedata = new ChartClass();
            taskPiedata.name = String.valueOf(taskDateCount[i].get('Due_Date__c'));
            taskPiedata.y = Integer.valueOf(taskDateCount[i].get('expr0'));
            taskDataValues.add(taskPiedata);

        }     
        return taskDataValues;         

    }

    @AuraEnabled
    public static List<ChartClass> chartDataEvent(){
        List<ChartClass> eventDataValues = new List<ChartClass>();
        List<AggregateResult> eventDateCount  = [SELECT count(Id), Date__c FROM Event_To_Do_Item__c group by Date__c ] ;

        for(Integer i=0; i < eventDateCount.size(); i++){

      		ChartClass eventPiedata = new ChartClass();
            eventPiedata.name = String.valueOf(eventDateCount[i].get('Date__c'));
            eventPiedata.y = Integer.valueOf(eventDateCount[i].get('expr0'));
            eventDataValues.add(eventPiedata);

        }     
        return eventDataValues;         

    }
}