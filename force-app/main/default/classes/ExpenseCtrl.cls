public with sharing class ExpenseCtrl {
    @AuraEnabled
    public static List<AggregateResult> getExpenses(Date startDate, Date endDate){
        try {
            return [SELECT Expense_Type__c, SUM(Amount__c) TotalAmount
            FROM Expense__c
            GROUP BY Expense_Type__c];

            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void saveAsFile(String base64Image, String title){
        try {
            ContentVersion cv = new ContentVersion();
            cv.Title = title;
            cv.VersionData = EncodingUtil.base64Decode(base64Image);
            cv.PathOnClient = title + '.png';
            insert cv;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}