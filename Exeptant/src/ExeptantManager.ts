import { IExpectant } from './BaseExpectant';

export class ExpectantManager {
    private expectants: Map<string, IExpectant<any>> = new Map();
    private expirationTimes: Map<string, NodeJS.Timeout> = new Map();

    addExpectant<T>(expectant: IExpectant<T>, expirationMs?: number, eventToTrigger?: string): boolean {
        if (!this.expectants.has(expectant.exeptantID)) {
            this.expectants.set(expectant.exeptantID, expectant);

            if (eventToTrigger && expectant.subscribeToEvent) {
                expectant.subscribeToEvent(eventToTrigger, async () => await expectant.execut());
            }

            if (expirationMs) {
                const timeout = setTimeout(() => this.forget(expectant.exeptantID), expirationMs);
                this.expirationTimes.set(expectant.exeptantID, timeout);
            }
            return true;
        }
        return false;
    }

    async execut(exeptantID: string): Promise<void> {
        const expectant = this.expectants.get(exeptantID);
        if (expectant) await expectant.execut();
    }

    forget(exeptantID: string): void {
        const expectant = this.expectants.get(exeptantID);
        if (expectant) expectant.forget();
        this.expectants.delete(exeptantID);
    }

    async executeAll(): Promise<void> {
        for (const expectant of this.expectants.values()) {
            await expectant.execut();
        }
    }
}
