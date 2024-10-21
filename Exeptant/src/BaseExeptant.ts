export interface IBaseExpectantionProps<T extends any[] = any[]> {
    executFunction: (...args: T) => Promise<any>;
    disposeFunction?: () => void;
}

export interface IExpectant<T extends IBaseExpectantionProps> {
    actionType: string;
    exeptantID: string;
    init: (props: T) => boolean;
    execut: () => Promise<any>;
    forget: () => void;
    subscribeToEvent?: (event: string, callback: (eventDetail: any) => void) => void;
}

export abstract class BaseExpectant<T extends IBaseExpectantionProps> implements IExpectant<T> {
    actionType: string;
    protected props: T;
    exeptantID: string;

    constructor(actionType: string, props: T, exeptantID: string) {
        this.actionType = actionType;
        this.props = props;
        this.exeptantID = exeptantID;
    }

    abstract init(props: T): boolean;
    abstract execut(): Promise<any>;
    abstract forget(): void;

    subscribeToEvent(event: string, callback: (eventDetail: any) => void): void {
        window.addEventListener(event, (e: Event) => {
            const customEvent = e as CustomEvent;
            callback(customEvent.detail);
        });
    }
}
