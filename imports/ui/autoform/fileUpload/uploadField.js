import './uploadField.html';

Template.uploadField.helpers({
  log() {
    console.log(this);
  },
  // speed() {
  //   const value = this.estimateSpeed.get();
  //   return value;
  //   return filesize(value, {bits: true}) + '/сек';
  // },
  progressStateClass() {
    const value = this.state.get();
    if (value == "active") {
      const done = this.progress.get() >= 100;
      console.log(value, done);
      return !done ? "active" : "progress-bar-success active";
    } else if (value == "paused") {
      return false;
    } else if (value == "completed") {
      return "progress-bar-success active";
    } else /* value == "aborted" */ {
      return "progress-bar-danger";
    }
  },
  ifAbortedProgressStyle() {
    return this.state.get() == "aborted" ? "opacity: 0.7;" : false;
  },
  ifAbortedProgressClass() {
    return this.state.get() == "aborted" ? "bg-danger" : false;
  },
  stateIs(str) {
    return this.state.get() == str;
  },
  timeLeft() {
    const value = this.estimateTime.get();
    return value ? Math.floor(value / 1000) + 'сек.' : false;
  },
  progressValue() {
    const value = this.progress.get();
    const abandoned = this.state.get() == "abandoned";
    return abandoned ? value : Math.max(value, 1);
  }
});

// Template.uploadField.events({
//
// });
