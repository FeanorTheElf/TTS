import * as React from "react";
import { TrainingMode, SoundType, toMinuteSecondString } from "../training";

export default class Level4x730 {

    private static stepDuration = 7 * 60 + 30;

    private static getStep(seconds: number): number {
        return Math.floor(seconds / Level4x730.stepDuration) + 1;
    }

    public static shouldPlaySound(lastTickSeconds: number, currentTickSeconds: number): SoundType {
        if (Level4x730.getStep(currentTickSeconds) != Level4x730.getStep(lastTickSeconds)) {
            return Level4x730.getStep(currentTickSeconds) == 5 ? SoundType.finished : SoundType.continue;
        }
        return SoundType.none;
    }

    public static render(props: { seconds: number, children?: React.ReactChildren }): JSX.Element {
        const step = Level4x730.getStep(props.seconds);
        if (step >= 5) {
            return <div className="clock-display">
                <p className="text-done">Geschafft!</p>
            </div>;
        } else {
            const restSeconds = Level4x730.stepDuration - (props.seconds % Level4x730.stepDuration);
            return <div className="clock-display">
                <p><span className="secondary">{"Intervall "}</span><span>{step + " / 4"}</span></p>
                <p><span className="secondary">{"Zeit "}</span><span>{toMinuteSecondString(restSeconds)}</span></p>
            </div>;
        }
    }
};