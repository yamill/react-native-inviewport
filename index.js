'use strict';

var React = require('react');
var ReactNative = require('react-native');
var window = ReactNative.Dimensions.get('window');
var {View, NativeMethodsMixin} = ReactNative;
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

module.exports = createReactClass({
  displayName: 'InViewPort',
  mixins: [NativeMethodsMixin],
  propTypes: {
    onChange: PropTypes.func.isRequired,
    active: PropTypes.bool,
    delay: PropTypes.number
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
    var rect = el.measureInWindow((x, y, width, height) => {
      this.setState({
        rectTop: y,
        rectBottom: y + height,
        rectWidth: x + width,
      })
    });
    var isVisible = (
      this.state.rectBottom != 0 && this.state.rectTop >= 0 && this.state.rectBottom <= window.height &&
      this.state.rectWidth > 0 && this.state.rectWidth <= window.width
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
