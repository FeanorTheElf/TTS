import * as React from "react";

export default class Test extends React.PureComponent<{ time: number }, {}> {

    public render() {
        return <h1>{this.props.time}</h1>;
    }
}