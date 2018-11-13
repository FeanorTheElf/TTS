import * as React from "react";

export type TrainingComponent = React.ComponentClass<{ time: number }> | React.SFC<{ time: number }>;

export enum TrainingMode {
    level4x730 = "Stufenintervall",
    level20 = "Zirkelintervall"
}

export const trainingModes: TrainingMode[] = [TrainingMode.level4x730, TrainingMode.level20];