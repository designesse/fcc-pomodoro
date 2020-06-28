'use strict';

const e = React.createElement;

class PomodoroClock extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>FCC Pomodoro Clock</h1>
                    {['break', 'session'].map( (seance, i) => (
                        <Setting key={i} name={seance} />
                    ))}
            </React.Fragment>
        );
    }
}

function Setting(props) {
    let name = props.name;
    return (
        <div className="marg-bot-m">
            <div id={props.name + "-label"} className="cap">{props.name} length</div>
            <div>
                <span id={props.name + "-decrement"} className="unary-button inl-bl">-</span>
                <span id={props.name + "-length"}>0</span>
                <span id={props.name + "-increment"} className="unary-button inl-bl">+</span>
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#pomodoro_clock');
ReactDOM.render(e(PomodoroClock), domContainer);
