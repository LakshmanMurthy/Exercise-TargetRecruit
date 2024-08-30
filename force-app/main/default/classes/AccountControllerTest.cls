@isTest
public class AccountControllerTest {

    @isTest
    static void testGetAccounts() {
        // Retrieve an existing RecordType Id (Ensure that you have at least one RecordType in your org)
        String existingRecordTypeId = [SELECT Id FROM RecordType WHERE SObjectType = 'Account' LIMIT 1].Id;

        // Create test Account records
        Account acc1 = new Account(Name = 'Account 1', RecordTypeId = existingRecordTypeId, Rating = 'Hot', Type = 'Prospect', Ownership = 'Private', Industry = 'Technology', IsActive__c = true);
        Account acc2 = new Account(Name = 'Account 2', RecordTypeId = existingRecordTypeId, Rating = 'Cold', Type = 'Customer', Ownership = 'Public', Industry = 'Finance', IsActive__c = false);
        insert new List<Account>{ acc1, acc2 };

        Test.startTest();
        List<Account> accounts = AccountController.getAccounts();
        Test.stopTest();

        System.assertNotEquals(null, accounts, 'Accounts should not be null');
        System.assertEquals(2, accounts.size(), 'There should be 2 accounts');
    }

    @isTest
    static void testGetAccountRecordTypes() {
        Test.startTest();
        List<RecordType> recordTypes = AccountController.getAccountRecordTypes();
        Test.stopTest();

        System.assertNotEquals(null, recordTypes, 'RecordTypes should not be null');
        System.assert(!recordTypes.isEmpty(), 'There should be at least one record type');
    }

    @isTest
    static void testGetPicklistFields() {
        Test.startTest();
        List<String> picklistFields = AccountController.getPicklistFields();
        Test.stopTest();

        System.assertNotEquals(null, picklistFields, 'PicklistFields should not be null');
        System.assert(!picklistFields.isEmpty(), 'There should be at least one picklist field');
    }

    @isTest
    static void testGetPicklistValues() {
        // Use an existing RecordType Name (Ensure that you have at least one RecordType in your org)
        String existingRecordTypeName = [SELECT Name FROM RecordType WHERE SObjectType = 'Account' LIMIT 1].Name;

        // Create test Account records
        Account acc = new Account(Name = 'Test Account', RecordTypeId = [SELECT Id FROM RecordType WHERE Name = :existingRecordTypeName LIMIT 1].Id, Rating = 'Hot');
        insert acc;

        Test.startTest();
        List<String> picklistValues = AccountController.getPicklistValues(existingRecordTypeName, 'Rating');
        Test.stopTest();

        System.assertNotEquals(null, picklistValues, 'PicklistValues should not be null');
        System.assert(!picklistValues.isEmpty(), 'There should be at least one picklist value');
    }
}
