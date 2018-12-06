import { SoundType } from "./training";

export interface Config {
    soundUrls: {
        [P in SoundType]?: string
    },
    backgroundImageUrl?: string
}

export const currentConfig: Config | undefined = (<any>window).configuration;