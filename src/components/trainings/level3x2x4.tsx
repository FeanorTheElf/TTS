import * as React from "react";
import { TrainingMode, SoundType, SoundTypeValue, toMinuteSecondString } from "../training";

export default class Level3x2x4 {

    private static powerblockDuration = 4 * 60;
    private static exerciseDuration = 2 * Level3x2x4.powerblockDuration;
    private static lastPowerblock = 6;

    private static getExercise(seconds: number): number {
        return Math.floor(seconds / Level3x2x4.exerciseDuration) + 1;
    }

    private static getPowerblock(seconds: number): number {
        return Math.floor(seconds / Level3x2x4.powerblockDuration) + 1;
    }

    public static shouldPlaySound(lastTickSeconds: number, currentTickSeconds: number): SoundType | null {
        if (Level3x2x4.getPowerblock(currentTickSeconds) == Level3x2x4.lastPowerblock + 1 &&
                Level3x2x4.getPowerblock(currentTickSeconds) != Level3x2x4.getPowerblock(lastTickSeconds))
            return SoundTypeValue.finished;
        else if (Level3x2x4.getPowerblock(currentTickSeconds) != Level3x2x4.getPowerblock(lastTickSeconds) &&
                Level3x2x4.getPowerblock(currentTickSeconds) <= Level3x2x4.lastPowerblock) {
            return SoundTypeValue.continue;
        } else {
            return SoundTypeValue.none;
        }
    }

    public static render(props: { seconds: number, children?: React.ReactChildren }): JSX.Element {
        const powerblock = Level3x2x4.getPowerblock(props.seconds);
        if (powerblock > Level3x2x4.lastPowerblock) {
            return <div className="clock-display">
                <p className="text-done">Geschafft!</p>
            </div>;
        } else {
            const restSeconds = Level3x2x4.powerblockDuration - (props.seconds % Level3x2x4.powerblockDuration);
            return <div className="clock-display">
                <p><span className="secondary">{"Übung "}</span><span>{Level3x2x4.getExercise(props.seconds) + " / 3"}</span></p>
                <p><span className="secondary secondary-long">{"Wiederholung "}</span>
                    <span className="secondary secondary-short">{"Wiederh. "}</span><span>{(2 - powerblock % 2) + " / 2"}</span></p>
                <p><span className="secondary">{"Zeit "}</span><span>{toMinuteSecondString(restSeconds)}</span></p>
            </div>;
        }
    }

};