public class TodoAppController {
    
    @AuraEnabled
    public static List<Task_To_Do_Item__c> getTaskData(){
        List<Task_To_Do_Item__c> taskRecordList = new List<Task_To_Do_Item__c>();
        try{
            taskRecordList = [SELECT Subject__c, Description__c, Due_Date__c, Assigned_To__c, Related_Object__c, Related_ID__c, Status__c FROM Task_To_Do_Item__c];           
        }catch(Exception e){
                   System.debug('taskRecordList Error ' + e.getMessage());
        }
        return taskRecordList;
    } 
    @AuraEnabled
    public static List<Event_To_Do_Item__c> getEventData(){
            List<Event_To_Do_Item__c> eventRecordList = new List<Event_To_Do_Item__c>();
        try{
            eventRecordList = [SELECT Subject__c, Description__c, Date__c, Start_Date__c, End_Date__c, Related_Object__c, Related_ID__c, Status__c FROM Event_To_Do_Item__c];
        }catch(Exception e){
                   System.debug('eventRecordList Error '+e.getMessage());
        }
        return eventRecordList;
    } 

    public class ChartData {
        @AuraEnabled
        public String name {get; set;}
        @AuraEnabled
        public Decimal y {get; set;}
    } 

    @AuraEnabled
    public static List<ChartData> chartDataTask(){
        List<ChartData>  taskChartDataValues = new List<ChartData>();
        List<AggregateResult> taskDateCount  = [SELECT count(Id), Due_Date__c FROM Task_To_Do_Item__c group by Due_Date__c] ;

        for(Integer i=0; i < taskDateCount.size(); i++){
            try{
                ChartData taskPiedata = new ChartData();
                taskPiedata.name = String.valueOf(taskDateCount[i].get('Due_Date__c'));
                taskPiedata.y = Integer.valueOf(taskDateCount[i].get('expr0'));
                taskChartDataValues.add(taskPiedata);
            }catch(Exception e){
                       System.debug('chartDataTask Error '+e.getMessage());
            }
        }     
        return taskChartDataValues;         

    }

    @AuraEnabled
    public static List<ChartData> chartDataEvent(){
        List<ChartData> eventChartDataValues = new List<ChartData>();
        List<AggregateResult> eventDateCount  = [SELECT count(Id), Date__c FROM Event_To_Do_Item__c group by Date__c ] ;

        for(Integer i=0; i < eventDateCount.size(); i++){
            try{
                ChartData eventPiedata = new ChartData();
                eventPiedata.name = String.valueOf(eventDateCount[i].get('Date__c'));
                eventPiedata.y = Integer.valueOf(eventDateCount[i].get('expr0'));
                eventChartDataValues.add(eventPiedata);
            }catch(Exception e){
                       System.debug('chartDataEvent Error '+e.getMessage());
            }
        }     
        return eventChartDataValues;         

    }


    @AuraEnabled(cacheable=true)
    public static List<Task_To_Do_Item__c> taskSearch(String subject){
        List<Task_To_Do_Item__c> taskRecordList = new List<Task_To_Do_Item__c>();
        // subject = 'new';
        if(subject.length()!=0){
            String subjectKey = '%'+subject+'%';
        try {

            taskRecordList = [SELECT Subject__c, Description__c, Due_Date__c, Assigned_To__c, Related_Object__c, Related_ID__c, Status__c FROM Task_To_Do_Item__c where Subject__c LIKE:subjectKey];
            return taskRecordList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
       }

        }
        else {
           return  getTaskData();
        }
        
    }

    @AuraEnabled(cacheable=true)
    public static List<Event_To_Do_Item__c> eventSearch(String subject){
        List<Event_To_Do_Item__c> eventRecordList = new List<Event_To_Do_Item__c>();
        // subject = 'new';
        if(subject.length()!=0){
            String subjectKey = '%'+subject+'%';
        try {

            eventRecordList = [SELECT Subject__c, Description__c, Date__c, Start_Date__c, End_Date__c, Related_Object__c, Related_ID__c, Status__c FROM Event_To_Do_Item__c where Subject__c LIKE:subjectKey];
            return eventRecordList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
       }

        }
        else {
           return  getEventData();
        }
        
    }
}