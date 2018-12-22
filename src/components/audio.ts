import { SoundType, SoundTypeValue, soundTypes } from "./training";
import { Config, currentConfig } from "./config";

type test = keyof SoundType;

type SoundMap = {
    [P in SoundType]: HTMLAudioElement;
}

export class AudioManager {

    private sounds: SoundMap;

    constructor() {
        this.sounds = {
            continue: new Audio((currentConfig && currentConfig.soundUrls && currentConfig.soundUrls.continue) || "continue.mp3"),
            finished: new Audio((currentConfig && currentConfig.soundUrls && currentConfig.soundUrls.finished) || "finished.mp3")
        };
        soundTypes.forEach(type => this.sounds[type].load());
    }

    public play(type: SoundType) {
        const sound = this.sounds[type];
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }
}