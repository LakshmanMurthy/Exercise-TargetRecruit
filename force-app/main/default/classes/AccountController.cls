public with sharing class AccountController {

    // Method to fetch Account records
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, RecordType.Name,Rating,
        Type,Ownership,Industry, IsActive__c FROM Account LIMIT 100];
    }

    // Method to fetch Record Types for Accounts
    @AuraEnabled(cacheable=true)
    public static List<RecordType> getAccountRecordTypes() {
        return [SELECT Id, Name FROM RecordType WHERE SObjectType = 'Account'];
    }

    // Method to fetch available picklist fields for Account object
    @AuraEnabled(cacheable=true)
    public static List<String> getPicklistFields() {
        List<String> picklistFields = new List<String>();
        Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get('Account');
        Map<String, Schema.SObjectField> fieldMap = sObjectType.getDescribe().fields.getMap();

        for (Schema.SObjectField field : fieldMap.values()) {
            Schema.DescribeFieldResult fieldResult = field.getDescribe();
            if (fieldResult.getType() == Schema.DisplayType.Picklist) {
                picklistFields.add(fieldResult.getName());
            }
        }
        return picklistFields;
    }

    // Method to fetch picklist values based on record type and field name
    @AuraEnabled(cacheable=true)
    public static List<String> getPicklistValues(String recordTypeName, String fieldName) {
        List<String> picklistValues = new List<String>();
        Schema.DescribeSObjectResult describeResult = Account.sObjectType.getDescribe();
        Schema.RecordTypeInfo recordTypeInfo = describeResult.getRecordTypeInfosByName().get(recordTypeName);

        if (recordTypeInfo != null) {
            Map<String, Schema.SObjectField> fields = describeResult.fields.getMap();
            Schema.DescribeFieldResult fieldResult = fields.get(fieldName).getDescribe();
            List<Schema.PicklistEntry> picklistEntries = fieldResult.getPicklistValues();

            for (Schema.PicklistEntry entry : picklistEntries) {
                if (entry.isActive()) {
                    picklistValues.add(entry.getLabel());
                }
            }
        }
        return picklistValues;
    }
}
