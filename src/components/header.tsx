import * as React from "react";
import { TrainingMode } from "./training";

interface TTSHeaderProps {
    supportedModes: TrainingMode[];
    onModeChosen?: (mode: TrainingMode) => void;
    onStart?: () => void;
    onPause?: () => void;
    onReset?: () => void;
}

interface TTSHeaderState {
    menuOpen: boolean;
    activeModeIndex: number;
}

function TrainingModeDropdown(props: { supportedModes: TrainingMode[], activeModeIndex: number, onClick?: (modeIndex: number) => void }) {
    return <div className="header-item complex-content primary clickable">
        <div className="dropdown">
			{props.supportedModes.map((mode, index) => {
                const primary = index == props.activeModeIndex ? " primary" : "";
                if (props.onClick) {
                    return <span className={"dropdown-item" + primary} onClick={() => props.onClick(index)} > {mode}</span>;
                } else {
                    return <span className={"dropdown-item" + primary}> {mode}</span>;
                }
			})}
        </div>
    </div>;
}

export class TTSHeader extends React.PureComponent<TTSHeaderProps, TTSHeaderState> {

    constructor(props: TTSHeaderProps) {
        super(props);
        this.state = {
            menuOpen: true,
            activeModeIndex: 0
        };
        this.onModeChosen = this.onModeChosen.bind(this);
        this.onMenuOpen = this.onMenuOpen.bind(this);
    }

    private onModeChosen(modeIndex: number) {
        this.setState({
            activeModeIndex: modeIndex,
            menuOpen: false
        }, () => {
            if (this.props.onModeChosen) {
                this.props.onModeChosen(this.props.supportedModes[this.state.activeModeIndex]);
            }
        });
    }

    private onMenuOpen() {
        this.setState({
            menuOpen: true
        })
    }

    public render() {
        return <div className="header">
            <div className="header-item">
                <span className="header-item-content">TTS</span>
            </div>
            {this.state.menuOpen ?
                <TrainingModeDropdown activeModeIndex={this.state.activeModeIndex} supportedModes={this.props.supportedModes}
                    onClick={this.onModeChosen} /> :
                <div className="header-item clickable primary" onClick={event => this.onMenuOpen()}>
                    <span className="header-item-content">{this.props.supportedModes[this.state.activeModeIndex]}</span>
                </div>}
            <div className="header-item">
                <span className="header-item-content">Start</span>
            </div>
        </div>;
    }
}