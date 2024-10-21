import { IBaseExpectantionProps } from '../BaseExpectant';

export interface ISpecificationsValueChangedProps extends IBaseExpectantionProps<[string, string, string, any]> {
    layerId: string;
    featureID: string;
    propertyName: string;
    propertyValue: any;
}
