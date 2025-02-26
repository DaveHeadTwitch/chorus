import Inferno from "inferno";
import Component from "inferno-component";

import "./style.scss";

const getHumanTime = time => {
  if (!time || time < 0) return;
  time = (time / 1000) >> 0;
  let seconds = time % 60;
  time = (time / 60) >> 0;
  let minutes = time % 60;
  time = (time / 60) >> 0;
  const hours = time % 24;
  const days = (time / 24) >> 0;
  return [
    days && `${days}d`,
    hours && `${hours}h`,
    minutes && `${minutes}m`,
    `${seconds}s`
  ]
    .filter(x => x)
    .join(" ");
};

const RELEASE_BS = new Date("2019-05-31T23:00:00Z");
const RELEASE_MONTHLY = new Date("2019-06-07T19:02:00Z");

export default class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftBS: RELEASE_BS - new Date(),
      leftMonthly: RELEASE_MONTHLY - new Date()
    };
    if (this.state.leftBS > 0 || this.state.leftMonthly > 0)
      setInterval(
        () =>
          this.setState({
            leftBS: RELEASE_BS - new Date(),
            leftMonthly: RELEASE_MONTHLY - new Date()
          }),
        333
      );
  }
  render() {
    const monthlyCountdown = (
      <div>
        <b>{getHumanTime(this.state.leftMonthly)}</b> until next CSC Monthly
        Pack: <b>Anything but Metal 2</b>!
      </div>
    );
    const monthlyBlurb = (
      <div>
        1 year of <b>CSC Monthly Packs</b>, and we're back full circle, with{" "}
        <b>Anything But Metal 2</b>!
        <a href="https://www.youtube.com/watch?v=h_iLyypN98M" target="_blank">
          Release video
        </a>
      </div>
    );
    const bsCountdown = (
      <div>
        <b>{getHumanTime(this.state.leftBS)}</b> before everything gets
        uncovered...
      </div>
    );
    const bsBlurb = (
      <div>
        No BS, this setlist smacks and <i>covers</i> everything you need. This
        is <b>Blanket Statement</b>.{" "}
        <a href="http://bit.ly/BSsetlist" target="_blank">
          Release link
        </a>
      </div>
    );
    return (
      <div className="Announcement">
        {this.state.leftBS > 0 ? bsCountdown : bsBlurb}
        {this.state.leftMonthly > 0 ? monthlyCountdown : monthlyBlurb}
      </div>
    );
  }
}
