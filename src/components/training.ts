import * as React from "react";

import Level4x730 from "./trainings/level4x730";
import Level20 from "./trainings/level20";
import Level3x8x30 from "./trainings/level3x8x30";

export function toMinuteSecondString(seconds: number): string {
    return Math.floor(seconds / 60) + ":" + (seconds % 60);
}

export type SoundType = "continue" | "finished";

export const soundTypes: SoundType[] = ["continue", "finished"];

export class SoundTypeValue {
    static readonly none: SoundType | null = null;
    static readonly continue: SoundType = "continue";
    static readonly finished: SoundType = "finished";
}

export interface TrainingMode {
    shouldPlaySound(lastTickSeconds: number, currentTickSeconds: number): SoundType | null;
    render: React.SFC<{ seconds: number }>;
}

export type TrainingModeType = "Stufenintervall" | "Zirkelintervall" | "Hochintensitätssatz";

type TrainingTypeMap = {
    [K in TrainingModeType]: TrainingMode;
}

export const trainingModeTypes: TrainingModeType[] = ["Stufenintervall", "Zirkelintervall", "Hochintensitätssatz"];

export const trainingModes: TrainingTypeMap = {
    "Stufenintervall": Level4x730,
    "Zirkelintervall": Level20,
    "Hochintensitätssatz": Level3x8x30
}