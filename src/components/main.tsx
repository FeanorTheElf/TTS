import * as React from "react";
import { TrainingClock } from "./clock";
import { TTSHeader } from "./header";
import { trainingModeTypes, trainingModes, TrainingModeType } from "./training";

interface MainState {
    currentMode: TrainingModeType;
}

export default class Main extends React.PureComponent<{}, MainState> {

    private clockRef: React.RefObject<TrainingClock>;

    constructor(props: {}) {
        super(props);
        this.state = {
            currentMode: "Stufenintervall"
        }

        this.clockRef = React.createRef();
        this.onStart = this.onStart.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onModeChosen = this.onModeChosen.bind(this);
    }

    private onStart() {
        if (this.clockRef.current)
            this.clockRef.current.start();
    }

    private onPause() {
        if (this.clockRef.current)
            this.clockRef.current.pause();
    }
    
    private onModeChosen(mode: TrainingModeType) {
        this.clockRef.current.setTrainingMode(trainingModes[mode]);
        this.setState({
            currentMode: mode
        });
    }

    public render() {
        return <div>
            <TTSHeader supportedModes={trainingModeTypes} activeMode={this.state.currentMode} onStart={this.onStart} onPause={this.onPause} onModeChosen={this.onModeChosen} />
            <TrainingClock ref={this.clockRef} initialTrainingMode={trainingModes[this.state.currentMode]} />
        </div>;
    }
}