import * as React from "react";
import { TrainingModeType } from "./training";

interface TTSHeaderProps {
    supportedModes: TrainingModeType[];
    activeMode: TrainingModeType;
    onModeChosen?: (mode: TrainingModeType) => void;
    onStart?: () => void;
    onPause?: () => void;
}

interface TTSHeaderState {
    menuOpen: boolean;
}

function TrainingModeDropdown(props: { supportedModes: TrainingModeType[], activeModeIndex: number, onClick?: (modeIndex: number) => void }) {
    return <div className="header-item complex-content primary clickable">
        <div className="dropdown">
			{props.supportedModes.map((mode, index) => {
                const primary = index == props.activeModeIndex ? " primary" : "";
                const onClick = props.onClick;
                if (onClick) {
                    return <span key={mode} className={"dropdown-item" + primary} onClick={() => onClick(index)} > {mode}</span>;
                } else {
                    return <span key={mode} className={"dropdown-item" + primary}> {mode}</span>;
                }
			})}
        </div>
    </div>;
}

export class TTSHeader extends React.PureComponent<TTSHeaderProps, TTSHeaderState> {

    constructor(props: TTSHeaderProps) {
        super(props);
        this.state = {
            menuOpen: false
        };
        this.onModeChosen = this.onModeChosen.bind(this);
        this.onMenuOpen = this.onMenuOpen.bind(this);
    }

    private onModeChosen(modeIndex: number) {
        if (this.props.onModeChosen && this.props.supportedModes[modeIndex] != this.props.activeMode) {
            this.props.onModeChosen(this.props.supportedModes[modeIndex]);
        }
        this.setState({
            menuOpen: false
        });
    }

    private onMenuOpen() {
        this.setState({
            menuOpen: true
        })
    }

    public render() {
        const activeModeIndex = this.props.supportedModes.indexOf(this.props.activeMode);
        return <div className="header">
            <div className="header-item">
                <span className="header-item-content">TTS</span>
            </div>
            {this.state.menuOpen ?
                <TrainingModeDropdown activeModeIndex={activeModeIndex} supportedModes={this.props.supportedModes}
                    onClick={this.onModeChosen} /> :
                <div className="header-item clickable primary" onClick={this.onMenuOpen}>
                    <span className="header-item-content">{this.props.supportedModes[activeModeIndex]}</span>
                </div>}
            <div className="header-item clickable" onClick={this.props.onStart} >
                <span className="header-item-content">Start</span>
            </div>
            <div className="header-item clickable" onClick={this.props.onPause} >
                <span className="header-item-content">Pause</span>
            </div>
        </div>;
    }
}