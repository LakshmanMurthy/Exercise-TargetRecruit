import { LightningElement, api } from 'lwc';

export default class CustomSvgIcon extends LightningElement {
    // @api iconName;   
       // SVG icon name or type
    @api iconColor;     // Color to apply to the SVG
    @api iconPath;      // SVG path data

    // get iconClass() {
    //     return `slds-icon slds-icon_${this.iconName}`;
    // }

    // get svgStyle() {
    //     return `color: ${this.iconColor}`;
    // }
    
    get iconStyle() {
        console.log('custom svg icon ');
        console.log(this.iconColor);
        console.log(this.iconPath);
        
        return `color: ${this.iconColor};`;
    }
    
}
