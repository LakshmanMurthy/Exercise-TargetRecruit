import { createElement } from 'lwc';
import AccountDataTable from 'c/accountDataTable';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import getAccountRecordTypes from '@salesforce/apex/AccountController.getAccountRecordTypes';

// Mock Apex methods
jest.mock(
    '@salesforce/apex/AccountController.getAccounts',
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

jest.mock(
    '@salesforce/apex/AccountController.getAccountRecordTypes',
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

describe('c-account-data-table', () => {
    afterEach(() => {
        // Clean up the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('loads account records and displays them in a datatable', () => {
        const element = createElement('c-account-data-table', {
            is: AccountDataTable
        });
        document.body.appendChild(element);

        // Mock data
        const mockAccounts = [
            { Id: '1', Name: 'Account 1', IsActive__c: true, RecordType: { Name: 'Type 1' } },
            { Id: '2', Name: 'Account 2', IsActive__c: false, RecordType: { Name: 'Type 2' } }
        ];

        getAccounts.mockResolvedValue(mockAccounts);

        // Check if data is rendered correctly
        return Promise.resolve().then(() => {
            const rows = element.shadowRoot.querySelectorAll('lightning-datatable tr');
            expect(rows.length).toBe(mockAccounts.length);
        });
    });

    // Additional Jest tests for dropdown behavior and other component logic
});
