import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import getAccountRecordTypes from '@salesforce/apex/AccountController.getAccountRecordTypes';
import getPicklistFields from '@salesforce/apex/AccountController.getPicklistFields';
import getPicklistValues from '@salesforce/apex/AccountController.getPicklistValues';


export default class AccountDataTable extends LightningElement {
    @track accounts = [];
    @track allAccounts = [];
    @track recordTypes = [];
    @track picklistFields = [];
    @track picklistValues = [];
    @track selectedRecordType = '';
    @track selectedPicklistField = '';
    @track selectedPicklistValue = '';

    columns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Record Type', fieldName: 'RecordTypeName', type: 'text' },
        { label: 'Rating', fieldName: 'Rating', type: 'text' },
        {
            label: 'Active Status',
            type: 'boolean',
            cellAttributes: {               
                iconName: { fieldName: 'iconName' },
                iconClass: { fieldName: 'iconClass' }
            }
        },
    ];

    connectedCallback() {
        this.loadAccounts();
        this.loadRecordTypes();
        this.loadPicklistFields();
    }

    loadAccounts() {
        getAccounts()
            .then(result => {
                this.allAccounts = result.map(acc => ({
                    ...acc,
                    RecordTypeName: acc.RecordType ? acc.RecordType.Name : 'N/A',
                    Rating: acc.Rating ? acc.Rating :'N/A',
                    iconName: acc.IsActive__c ? 'action:check' : 'action:close',
                    iconClass: acc.IsActive__c ? 'slds-icon-text-success' : 'slds-icon-text-error',
                }));
                this.filterAccounts(); // Initialize with all accounts
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    }
   

    loadRecordTypes() {
        getAccountRecordTypes()
            .then(result => {
                this.recordTypes = result.map(rt => ({
                    label: rt.Name,
                    value: rt.Name
                }));
            })
            .catch(error => {
                console.error('Error fetching record types:', error);
            });
    }

    loadPicklistFields() {
        getPicklistFields()
            .then(result => {
                this.picklistFields = result.map(field => ({
                    label: field,
                    value: field
                }));
            })
            .catch(error => {
                console.error('Error fetching picklist fields:', error);
            });
    }

    loadPicklistValues() {
        if (this.selectedRecordType && this.selectedPicklistField) {
            getPicklistValues({ recordTypeName: this.selectedRecordType, fieldName: this.selectedPicklistField })
                .then(result => {
                    this.picklistValues = result.map(value => ({
                        label: value,
                        value: value
                    }));
                })
                .catch(error => {
                    console.error('Error fetching picklist values:', error);
                });
        }
    }

    handleRecordTypeChange(event) {
        this.selectedRecordType = event.target.value;
        this.loadPicklistValues(); 
        this.filterAccounts(); 
    }

    handlePicklistFieldChange(event) {
        this.selectedPicklistField = event.target.value;
        this.loadPicklistValues(); 
        this.filterAccounts();
    }

    handlePicklistValueChange(event) {
        this.selectedPicklistValue = event.target.value;
        this.filterAccounts(); 
    }

    filterAccounts() {    
        this.accounts = this.allAccounts.filter(account => {            
            const matchesRecordType = this.selectedRecordType 
                ? account.RecordTypeName.trim() === this.selectedRecordType.trim() 
                : true;            
        
            const picklistField = this.selectedPicklistField;
            const accountPicklistValue = account[picklistField] ? account[picklistField].toString().trim() : '';
            const matchesPicklistValue = this.selectedPicklistField && this.selectedPicklistValue
                ? accountPicklistValue === this.selectedPicklistValue.trim()
                : true;   
            return matchesRecordType && matchesPicklistValue;
        });    
    }
    get hasData() {
        return this.accounts.length > 0;
    }
}
