'use strict';

const e = React.createElement;

class PomodoroClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'sessions': [
                { name: 'session', timeDefaultVal: 25 },
                { name: 'break', timeDefaultVal: 5 },
            ],
            'currSess': { iSess: 0, name: 'session', min: 25, sec: 0 }
        };
        this.unaryUpdate = this.unaryUpdate.bind(this);
    }

    unaryUpdate(op, iSess) {
        let sessions = this.state.sessions;
        if ( op === "-") {
            sessions[iSess].timeDefaultVal--;
        }
        else if ( op === "+") {
            sessions[iSess].timeDefaultVal++;
        }
        this.setState((state, props) => { return {sessions: sessions} });
    }

    render() {
        return (
            <React.Fragment>
                <Timer currSess={this.state.currSess} />
                <div className="fl-r">
                    {this.state.sessions.map( (session, i) => (
                        <Setting key={i} session={session} iSess={i} unaryUpdate={this.unaryUpdate} />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

function formatmmss(min, sec) {
    let mmss = [min, sec].map( val => val> 9 ? String(val) : '0'+String(val) );
    return mmss[0] + ":" + mmss[1];
}

function Timer(props) {
    return (
        <div id="timer" className="marg-bot-m">
            <div id="timer-label" className="marg-bot-m marg-top-m text-cap text-l">{props.currSess.name}</div>
            <div id="time-left" className="marg-bot-m text-l">{formatmmss(props.currSess.min, props.currSess.sec)}</div>
            <div id="start_stop" className="marg-bot-m"><span className="text-bold">&gt;</span> | <span className="text-bold">II</span></div>
            <div id="reset" className="marg-bot-m"><span className="text-underline">Reset</span></div>
        </div>
    )
}

function Setting(props) {
    return (
        <div className="marg-bot-m">
            <div id={props.session.name + "-label"} className="cap">{props.session.name} length</div>
            <div>
                <button id={props.session.name + "-decrement" } className="unary-button inl-bl pointer" onClick={() => props.unaryUpdate('-', props.iSess)} disabled={props.session.timeDefaultVal<=1} >-</button>
                <span id={props.session.name + "-length"}>{props.session.timeDefaultVal}</span>
                <button id={props.session.name + "-increment" } className="unary-button inl-bl pointer" onClick={() => props.unaryUpdate('+', props.iSess)} disabled={props.session.timeDefaultVal>=60} >+</button>
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#pomodoro_clock');
ReactDOM.render(e(PomodoroClock), domContainer);
