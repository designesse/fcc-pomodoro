'use strict';

const e = React.createElement;

class PomodoroClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'sessions': [
                { name: 'session', timeVal: 25, timeDefaultVal: 25 },
                { name: 'break', timeVal: 5, timeDefaultVal: 5 },
            ],
            'currSess': { iSess: 0, name: 'session', min: 25, sec: 0 },
            'isOn': false,
            'intervId': null
        };

        this.clickPlayPause = this.clickPlayPause.bind(this);
        this.clickReset = this.clickReset.bind(this);
        this.countDown = this.countDown.bind(this);
        this.unaryUpdate = this.unaryUpdate.bind(this);
    }

    clickPlayPause() {
        var intervId = this.state.intervId;
        var isOn = !this.state.isOn;

        if (isOn) {
            intervId = setInterval(this.countDown, 1000);
        }
        else {
            clearInterval(intervId);
            intervId = null;
        }

        this.setState((state, props) => { return {isOn: isOn, intervId: intervId} });
    }

    clickReset() {
        clearInterval(this.state.intervId);
        let sessions = this.state.sessions.map( session => { session.timeVal = session.timeDefaultVal; return session });
        let timer = this.state.currSess;
        timer.min = sessions[timer.iSess].timeDefaultVal;
        timer.sec = 0;
        this.setState((state, props) => { return {currSess: timer, intervId: null, isOn: false, sessions: sessions} });
    }

    countDown() {
        let timer = this.state.currSess;
        let isOn = this.state.isOn;
        if ( timer.sec ) {
            timer.sec--;
        }
        else {
            if ( timer.min ) {
                timer.sec = 59;
                timer.min--;
            }
            else {
                isOn = false;
            }
        }

        this.setState((state, props) => { return {isOn: isOn, currSess: timer} });
    }

    unaryUpdate(op, iSess) {
        let sessions = this.state.sessions;
        let timer = this.state.currSess;

        if ( op === "-") {
            let decTimeVal = sessions[iSess].timeVal - 1;
            sessions[iSess].timeVal = decTimeVal;
            if ( iSess === timer.iSess ) {
                timer.min = decTimeVal;
                timer.sec = 0;
            }
        }
        else if ( op === "+") {
            let incTimeVal = sessions[iSess].timeVal + 1;
            sessions[iSess].timeVal = incTimeVal;
            if ( iSess === timer.iSess ) {
                timer.min = incTimeVal;
                timer.sec = 0;
            }
        }

        this.setState((state, props) => { return {sessions: sessions, currSess: timer} });
    }

    render() {
        return (
            <React.Fragment>
                <Timer currSess={this.state.currSess} isOn={this.state.isOn} clickPlayPause={this.clickPlayPause} clickReset={this.clickReset} />
                <div className="fl-r">
                    {this.state.sessions.map( (session, i) => (
                        <Setting key={i} session={session} iSess={i} isTimerOn={this.state.isOn} unaryUpdate={this.unaryUpdate} />
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
            <div id="start_stop" className="marg-bot-m"><span className="pointer text-bold" onClick={() => props.clickPlayPause()}>{ props.isOn ? "II" : ">" }</span></div>
            <div id="reset" className="marg-bot-m"><span className="pointer text-underline" onClick={() => props.clickReset()}>Reset</span></div>
        </div>
    )
}

function Setting(props) {
    return (
        <div className="marg-bot-m">
            <div id={props.session.name + "-label"} className="cap">{props.session.name} length</div>
            <div>
                <button id={props.session.name + "-decrement" } className="unary-button inl-bl pointer" onClick={() => props.unaryUpdate('-', props.iSess)} disabled={ props.session.timeVal<=1 || props.isTimerOn } >-</button>
                <span id={props.session.name + "-length"}>{props.session.timeVal}</span>
                <button id={props.session.name + "-increment" } className="unary-button inl-bl pointer" onClick={() => props.unaryUpdate('+', props.iSess)} disabled={ props.session.timeVal>=60 || props.isTimerOn } >+</button>
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#pomodoro_clock');
ReactDOM.render(e(PomodoroClock), domContainer);
