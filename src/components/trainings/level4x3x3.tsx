import * as React from "react";
import { TrainingMode, SoundType, SoundTypeValue, toMinuteSecondString } from "../training";

export default class Level4x3x3 {

    private static stepDuration = 3 * 60;
    private static exerciseDuration = 3 * Level4x3x3.stepDuration;

    private static getExercise(seconds: number): number {
        return Math.floor(seconds / Level4x3x3.exerciseDuration) + 1;
    }

    private static getStep(seconds: number): number {
        return Math.floor(seconds / Level4x3x3.stepDuration) % 3 + 1;
    }

    public static shouldPlaySound(lastTickSeconds: number, currentTickSeconds: number): SoundType | null {
        if (Level4x3x3.getExercise(currentTickSeconds) == 5 &&
                Level4x3x3.getExercise(currentTickSeconds) != Level4x3x3.getExercise(lastTickSeconds))
            return SoundTypeValue.finished;
        else if (Level4x3x3.getStep(currentTickSeconds) != Level4x3x3.getStep(lastTickSeconds) &&
                Level4x3x3.getExercise(currentTickSeconds) <= 4) {
            return SoundTypeValue.continue;
        } else {
            return SoundTypeValue.none;
        }
    }

    public static render(props: { seconds: number, children?: React.ReactChildren }): JSX.Element {
        const exercise = Level4x3x3.getExercise(props.seconds);
        if (exercise >= 5) {
            return <div className="clock-display">
                <p className="text-done">Geschafft!</p>
            </div>;
        } else {
            const step = Level4x3x3.getStep(props.seconds);
            const restSeconds = Level4x3x3.stepDuration - (props.seconds % Level4x3x3.stepDuration);
            return <div className="clock-display">
                <p><span className="secondary">{"Übung "}</span><span>{exercise + " / 4"}</span></p>
                <p><span className="secondary secondary-long">{"Wiederholung "}</span>
                    <span className="secondary secondary-short">{"Wiederh. "}</span><span>{step + " / 3"}</span></p>
                <p><span className="secondary">{"Zeit "}</span><span>{toMinuteSecondString(restSeconds)}</span></p>
            </div>;
        }
    }
};