'use strict';

var React = require('react-native');
var window = React.Dimensions.get('window');
var {View, NativeMethodsMixin} = React;

module.exports = React.createClass({
  displayName: 'InViewPort',
  mixins: [NativeMethodsMixin],
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool,
    delay: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      active: true,
      delay: 100
    };
  },

  getInitialState: function(){
    return {
      rectTop: 0,
      rectBottom: 0
    }
  },
  componentDidMount: function () {
    if (this.props.active) {
      this.startWatching();
    }
  },

  componentWillUnmount: function () {
    this.stopWatching();
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.active) {
      this.lastValue = null;
      this.startWatching();
    } else {
      this.stopWatching();
    }
  },

  startWatching: function () {
    if (this.interval) { return; }
    this.interval = setInterval(this.check, this.props.delay);
  },

  stopWatching: function () {
    this.interval = clearInterval(this.interval);
  },
  /**
   * Check if the element is within the visible viewport
   */
  check: function () {
    var el = this.refs.myview;
    var rect = el.measure((ox, oy, width, height, pageX, pageY) => {
      this.setState({
        rectTop: pageY,
        rectBottom: pageY + height
      })
    });
    var isVisible = (
      this.state.rectTop >= 0 && this.state.rectBottom <= window.height
    );

    // notify the parent when the value changes
    if (this.lastValue !== isVisible) {
      this.lastValue = isVisible;
      this.props.onChange(isVisible);
    }
  },

  render: function () {
    return (
      <View ref='myview' {...this.props}>
        {this.props.children}
      </View>
    );
  }
});
