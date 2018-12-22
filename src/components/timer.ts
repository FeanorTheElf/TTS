const timeScale = 1

export class Timer {

    private timerId?: NodeJS.Timeout;
    private startMillis?: number;
    private currentMillis: number;
    private running: boolean;
    private callback: (lastTickMillis: number, currentTickMillis: number) => void;

    private millisOnLastTick = 0;

    constructor(callback: (lastTick: number, current: number) => void) {
        this.currentMillis = 0;
        this.running = false;
        this.callback = callback;
        this.tick = this.tick.bind(this);
    }

    private tick() {
        const runningMillis = this.getMillisecondsRunning();
        this.callback(this.millisOnLastTick, runningMillis);
        this.millisOnLastTick = runningMillis;
    }

    public start() {
        if (!this.running) {
            this.timerId = setInterval(this.tick, 100);
            this.startMillis = Date.now();
            this.running = true;
        }
    }

    public pause() {
        if (this.running && this.timerId && this.startMillis) {
            this.currentMillis += (Date.now() - this.startMillis) * timeScale;

            clearInterval(this.timerId);
            this.timerId = undefined;
            this.running = false;
            this.tick();
        } else if (this.running) {
            console.error("The timer is running, but timerId or startMillis is not set: " + this);
        }
    }

    public stop() {
        this.pause();
    }

    private getMillisecondsRunning(): number {
        if (this.running && this.startMillis) {
            return (this.currentMillis + (Date.now() - this.startMillis) * timeScale);
        } else {
            if (this.running) {
                console.error("The timer is running, but startMillis is not set: " + this);
            }
            return (this.currentMillis);
        }
    }
}