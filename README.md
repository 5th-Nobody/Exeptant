# Expectant Manager

`Expectant Manager` is a lightweight library for managing asynchronous actions, called "expectants", which can be triggered by specific events. This library allows you to queue, execute, and automatically dispose of expectants in a flexible manner. It also supports subscribing to custom events.

## Features

- Manage asynchronous actions with custom execution logic.
- Automatically dispose of expectants after execution.
- Subscribe to custom events for automatic triggering of actions.
- Extensible design to easily create new types of expectants.
  
## Installation

Since the project is not yet published as a package, you can clone the repository directly:

```bash
git clone https://github.com/your-repo/expectant-manager.git
```
# Usage

## Basic Example

This is a simple example of how to use the ExpectantManager to manage expectants.
```typescript
import { ExpectantManager, SpecificationsValueChangedExpectant } from './expectant-manager';

// Create a new manager
const manager = new ExpectantManager();

// Define the logic for when an expectant is triggered
const expectant = new SpecificationsValueChangedExpectant(
  {
    layerId: 'layer1',
    featureID: 'feature123',
    propertyName: 'exampleProperty',
    propertyValue: 'newValue',
    executFunction: async (layerID, featureID, propertyName, propertyValue) => {
      // Your execution logic here
      console.log(`Updated ${propertyName} to ${propertyValue} for feature ${featureID}`);
    },
    disposeFunction: () => {
      console.log('Disposed');
    },
  },
  'expectant-001'
);

// Add the expectant to the manager
manager.addExpectant(expectant);

// Trigger the expectant manually
await manager.execut('expectant-001');

// Optionally, the expectant can be triggered by a custom event
manager.addExpectant(expectant, undefined, 'customEvent');
window.dispatchEvent(new CustomEvent('customEvent'));
```
## Extending the Library
You can easily extend the BaseExpectant class to create new types of expectants by implementing the required methods: init, execut, and forget.
```typescript
import { BaseExpectant, IBaseExpectantionProps } from './expectant-manager';

// Define a new type of expectant
class CustomExpectant extends BaseExpectant<IBaseExpectantionProps> {
  init(props: IBaseExpectantionProps): boolean {
    // Custom initialization logic
    return true;
  }

  async execut(): Promise<void> {
    // Custom execution logic
    console.log('Executing custom expectant');
  }

  forget(): void {
    // Custom cleanup logic
    console.log('Forgetting custom expectant');
  }
}
```
# API

## ExpectantManager

The `ExpectantManager` class provides methods to manage the lifecycle of expectants:

### Methods

- **`addExpectant(expectant: IExpectant<T>, expirationMs?: number, eventToTrigger?: string): boolean`**  
  Add an expectant to the manager. Optionally specify a timeout for auto-removal or an event that triggers the expectant.

- **`execut(exeptantID: string): Promise<void>`**  
  Execute the expectant manually.

- **`forget(exeptantID: string): void`**  
  Remove an expectant from the manager.

- **`executeAll(): Promise<void>`**  
  Execute all expectants in the manager.

- **`forgetExpectant(expectant: IExpectant<any>): void`**  
  Remove an expectant from the manager by passing the expectant instance itself.

## IExpectant

Each expectant implements the following interface:

### Methods

- **`init(props: T): boolean`**  
  Initialize the expectant with the provided properties.

- **`execut(): Promise<any>`**  
  Execute the expectant's main logic.

- **`forget(): void`**  
  Clean up resources or perform any necessary disposal actions.

- **`subscribeToEvent?(event: string, callback: (eventDetail: any) => void): void`**  
  (Optional) Subscribes to a custom event that triggers the expectant.

## ISpecificationsValueChangedProps

The `SpecificationsValueChangedExpectant` uses this interface to define its execution properties:

- **`layerId: string`**  
  The ID of the layer where the feature exists.

- **`featureID: string`**  
  The ID of the feature being modified.

- **`propertyName: string`**  
  The name of the property that is being changed.

- **`propertyValue: any`**  
  The new value for the property.

- **`executFunction: (layerID: string, featureID: string, propertyName: string, propertyValue: any) => Promise<any>`**  
  The function to execute when the expectant is triggered.

- **`disposeFunction?: () => void`**  
  Optional cleanup function when the expectant is disposed.

## Contributing

If you have suggestions, comments, found bugs, or just want to express your hatred towards the code or me, please feel free to do so. The code is open for you and your desires :3
