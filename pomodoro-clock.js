'use strict';

const e = React.createElement;

class PomodoroClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'sessions': [
                { name: 'break', defaultVal: 5, val: 5 },
                { name: 'session', defaultVal: 25, val:25 }
            ]
        };
    }
    render() {
        return (
            <React.Fragment>
                <h1>FCC Pomodoro Clock</h1>
                    {this.state.sessions.map( (session, i) => (
                        <Setting key={i} session={session} />
                    ))}
            </React.Fragment>
        );
    }
}

function Setting(props) {
    return (
        <div className="marg-bot-m">
            <div id={props.session.name + "-label"} className="cap">{props.session.name} length</div>
            <div>
                <span id={props.session.name + "-decrement"} className="unary-button inl-bl">-</span>
                <span id={props.session.name + "-length"}>{props.session.defaultVal}</span>
                <span id={props.session.name + "-increment"} className="unary-button inl-bl">+</span>
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#pomodoro_clock');
ReactDOM.render(e(PomodoroClock), domContainer);
