import { ISpecificationsValueChangedProps } from './ISpecificationsValueChangedProps';
import { BaseExpectant } from '../BaseExpectant';

export class SpecificationsValueChangedExpectant extends BaseExpectant<ISpecificationsValueChangedProps> {
    private permitedPropertysForSpecific: string[] = ["permited_One", "permited_Two"];

    constructor(props: ISpecificationsValueChangedProps, exeptantID: string) {
        super("SpecificationsValueChanged", props, exeptantID);
    }

    init(props: ISpecificationsValueChangedProps): boolean {
        return this.permitedPropertysForSpecific.includes(props.propertyName);
    }

    async execut(): Promise<any> {
        const { layerId, featureID, propertyName, propertyValue } = this.props;
        return this.props.executFunction(layerId, featureID, propertyName, propertyValue);
    }

    forget(): void {
        if (this.props.disposeFunction) this.props.disposeFunction();
    }
}
