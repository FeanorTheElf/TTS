import * as React from "react";
import { TrainingMode, SoundType, SoundTypeValue } from "./training";
import { Timer } from "./timer";
import { AudioManager } from "./audio";

export interface TrainingClockProps {
    initialTrainingMode: TrainingMode;
};

interface TrainingClockState {
    seconds: number;
    trainingMode: TrainingMode;
}

export class TrainingClock extends React.Component<TrainingClockProps, TrainingClockState> {

    private timer: Timer;
    private audioManager: AudioManager;

    constructor(props: TrainingClockProps) {
        super(props);
        this.tick = this.tick.bind(this);
        this.timer = new Timer(this.tick);
        this.audioManager = new AudioManager();
        this.state = {
            seconds: 0,
            trainingMode: props.initialTrainingMode
        };
    }

    private tick(lastTickMillis: number, currentTickMillis: number) {
        const lastTickSeconds = Math.floor(lastTickMillis / 1000);
        const currentTickSeconds = Math.floor(currentTickMillis / 1000);
        const sound = this.state.trainingMode.shouldPlaySound(lastTickSeconds, currentTickSeconds);
        if (sound) {
            this.audioManager.play(sound);
        }
        this.setState({
            seconds: currentTickSeconds
        });
    }

    public shouldComponentUpdate(nextProps: TrainingClockProps, nextState: TrainingClockState): boolean {
        return this.state.seconds != nextState.seconds || this.state.trainingMode != nextState.trainingMode;
    }

    public start() {
        this.timer.start();
    }

    public stop() {
        this.timer.stop();
    }

    public pause() {
        this.timer.pause();
    }

    public reset() {
        this.timer.stop();
        this.timer = new Timer(this.tick);
        this.setState({
            seconds: 0
        });
    }

    public setTrainingMode(mode: TrainingMode) {
        this.timer.stop();
        this.timer = new Timer(this.tick);
        this.setState({
            seconds: 0,
            trainingMode: mode
        });
    }

    render(): React.ReactNode {
        const TrainingModeComponent = this.state.trainingMode.render;
        return <div className="clock"><TrainingModeComponent seconds={this.state.seconds}/></div>;
    }
}