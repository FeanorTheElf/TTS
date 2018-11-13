import * as React from "react";
import { TrainingClock } from "./clock";
import { TTSHeader } from "./header";
import { trainingModes } from "./training";
import Test from "./trainings/test";

export default class Main extends React.PureComponent<{}, {}> {

    public render() {
        return <div> <TTSHeader supportedModes={ trainingModes } /> <TrainingClock trainingMode={ Test } /> </div>;
    }
}