import * as React from "react";
import { TrainingMode, SoundTypeValue, SoundType, toMinuteSecondString } from "../training";

export default class Level20 {

    private static duration = 20 * 60;

    public static shouldPlaySound(lastTickSeconds: number, currentTickSeconds: number): SoundType | null {
        if (lastTickSeconds < Level20.duration && currentTickSeconds >= Level20.duration) {
            return SoundTypeValue.finished;
        }
        return SoundTypeValue.none;
    }

    public static render(props: { seconds: number, children?: React.ReactChildren }): JSX.Element {
        if (props.seconds >= Level20.duration) {
            return <div className="clock-display">
                <p className="text-done">Geschafft!</p>
            </div>;
        } else {
            const restSeconds = Level20.duration - props.seconds;
            return <div className="clock-display">
                <p><span className="secondary">{"Zeit "}</span><span>{toMinuteSecondString(restSeconds)}</span></p>
            </div>;
        }
    }
};