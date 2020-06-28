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
    return (
        <div className="marg-bot-m">
            <div id="{props.name}-label">{props.name} length</div>
            <div>
                <span className="unary-button inl-bl" id="{props.name}-decrement">-</span>
                <span id="{props.name}-length">0</span>
                <span className="unary-button inl-bl" id="{props.name}-increment">+</span>
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#pomodoro_clock');
ReactDOM.render(e(PomodoroClock), domContainer);
