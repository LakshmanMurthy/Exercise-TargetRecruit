import { LightningElement, api } from 'lwc';

export default class CustomIcon extends LightningElement {
    @api iconName;
    @api iconStyle;

    // get iconStyle() {
    //     return this.iconStyle = this.isActive ? 'custom-success-icon' : 'custom-error-icon';
    //     // this.iconStyle || '';
        
    // }
    // get iconStyle() {
    //     return this.iconStyle === 'custom-success-icon'
    //         ? 'color: #155724;'
    //         : 'color: #721c24;';
    // }
    // Example of setting iconClass dynamically
    // this.iconClass = this.isActive ? 'custom-success-icon' : 'custom-error-icon';

}
