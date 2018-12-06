import * as React from "react";
import { TrainingMode, SoundType, SoundTypeValue, toMinuteSecondString } from "../training";

enum IntervalType {
    pause, training
}

export default class Level3x8x30 {

    private static exerciseDuration = 8 * 30;

    private static getIntervalType(seconds: number): IntervalType {
        const secondsSinceStepBegin = seconds % 30;
        if (secondsSinceStepBegin < 20)
            return IntervalType.training;
        else
            return IntervalType.pause;
    }

    private static getStep(seconds: number): number {
        return Math.floor(seconds / 30) % 8 + 1;
    }

    private static getExercise(seconds: number): number {
        return Math.floor(seconds / Level3x8x30.exerciseDuration) + 1;
    }

    public static shouldPlaySound(lastTickSeconds: number, currentTickSeconds: number): SoundType | null {
        if (Level3x8x30.getExercise(currentTickSeconds) == 4 && Level3x8x30.getExercise(lastTickSeconds) < 4)
            return SoundTypeValue.finished;
        else if ((Level3x8x30.getIntervalType(lastTickSeconds) != Level3x8x30.getIntervalType(currentTickSeconds) ||
                Level3x8x30.getStep(lastTickSeconds) != Level3x8x30.getStep(currentTickSeconds) ||
                Level3x8x30.getExercise(lastTickSeconds) != Level3x8x30.getExercise(currentTickSeconds)) &&
                currentTickSeconds < 3 * Level3x8x30.exerciseDuration) {
            return SoundTypeValue.continue;
        } else {
            return SoundTypeValue.none;
        }
    }

    public static render(props: { seconds: number, children?: React.ReactChildren }): JSX.Element {
        const exercise = Level3x8x30.getExercise(props.seconds);
        if (exercise >= 4) {
            return <div className="clock-display">
                <p className="text-done">Geschafft!</p>
            </div>;
        } else if (Level3x8x30.getIntervalType(props.seconds) == IntervalType.training) {
            const restSeconds = 20 - (props.seconds % 30);
            return <div className="clock-display">
                <p><span className="secondary">{"Übung "}</span><span>{exercise + " / 3"}</span></p>
                <p><span className="secondary">{"Satz "}</span><span>{Level3x8x30.getStep(props.seconds) + " / 8"}</span></p>
                <p><span className="secondary">{"Zeit "}</span><span>{toMinuteSecondString(restSeconds) + " (Training)"}</span></p>
            </div>;
        } else {
            const restSeconds = 30 - (props.seconds % 30);
            return <div className="clock-display">
                <p><span className="secondary">{"Übung "}</span><span>{exercise + " / 3"}</span></p>
                <p><span className="secondary">{"Satz "}</span><span>{Level3x8x30.getStep(props.seconds) + " / 8"}</span></p>
                <p><span className="secondary">{"Zeit "}</span><span>{toMinuteSecondString(restSeconds) + " (Pause)"}</span></p>
            </div>;
        }
    }
};