import { ExpectantManager } from '../src';
import { SpecificationsValueChangedExpectant } from '../src/expectants/SpecificationsValueChangedExpectant';

const manager = new ExpectantManager();

const expectant = new SpecificationsValueChangedExpectant({
    layerId: 'layer1',
    featureID: 'feature123',
    propertyName: 'permited_One',
    propertyValue: 42,
    executFunction: async (layerId, featureID, propertyName, propertyValue) => {
        console.log('Updating feature:', layerId, featureID, propertyName, propertyValue);
        return Promise.resolve();
    }
}, 'expectant1');

manager.addExpectant(expectant);

// Trigger manually
manager.execut('expectant1');
