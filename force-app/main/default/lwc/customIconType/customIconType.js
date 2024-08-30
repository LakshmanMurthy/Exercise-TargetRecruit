import { LightningElement, api } from 'lwc';

export default class CustomIconType extends LightningElement {
    @api iconName;
    @api iconClass;

    get iconPath() {
        console.log('custom icon type');
        console.log(this.iconClass);
        console.log(this.iconName);
        switch (this.iconName) {
            case 'utility:check':
                return 'M10 16.17L4.83 11l-1.41 1.41L10 19 21 8.59 19.59 7.17z';
            case 'utility:close':
                return 'M19.414 6.586L13.828 12l5.586 5.586-1.415 1.414L12 13.828l-5.586 5.586-1.415-1.414L10.172 12 4.586 6.414 6 5l6.172 6.172L18.414 5z';
            default:
                return '';
        }
    }

    get iconColor() {
        console.log('custom icon type');
        console.log(this.iconClass);
        return this.iconClass === 'slds-icon-text-success' ? '#28a745' : '#dc3545';
    }
}
