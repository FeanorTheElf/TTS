import * as React from "react";
import { TrainingComponent } from "./training";

export interface TrainingClockProps {
    trainingMode: TrainingComponent;
};

interface TrainingClockState {
    timerId?: NodeJS.Timeout;
    startMillis?: number;
    currentMillis: number;
    running: boolean;
}

export class TrainingClock extends React.PureComponent<TrainingClockProps, TrainingClockState> {

    constructor(props: TrainingClockProps) {
        super(props);
        this.state = {
            currentMillis: 0,
            running: false
        };
        this.tick = this.tick.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.pause = this.pause.bind(this);
    }

    private tick() {
        this.forceUpdate();
    }

    public start() {
        const timerId = setInterval(this.tick, 1000);
        const startTime = Date.now();
        this.setState({
            timerId: timerId,
            startMillis: startTime,
            running: true
        });
    }

    public pause() {
        const stopTime = Date.now();
        this.setState((prevState: Readonly<TrainingClockState>) => {
            return {
                currentMillis: prevState.currentMillis + stopTime - prevState.startMillis,
                running: false
            };
        }, () => {
            if (this.state.timerId) {
                clearInterval(this.state.timerId)
            }
        });
    }

    public stop() {
        this.setState({ running: false }, () => {
            if (this.state.timerId) {
                clearInterval(this.state.timerId)
            }
        });
    }

    private getMillisecondsRunning(): number {
        if (this.state.running) {
            return this.state.currentMillis + (Date.now() - this.state.startMillis);
        } else {
            return this.state.currentMillis;
        }
    }

    public componentDidMount() {
    }

    public componentWillUnmount() {
        this.stop();
    }

    render() {
        const Content = this.props.trainingMode;
        return <Content time={this.getMillisecondsRunning()} />;
    }
}