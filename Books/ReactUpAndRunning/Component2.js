var Component2 = React.createClass({
  propTypes :{
    name: React.PropTypes.string.isRequired
  },
  render: function () {
    return React.DOM.span(null, "My Last name is: " + this.props.name);
  }
});
