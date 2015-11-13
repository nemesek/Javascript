var Component = React.createClass({
  render: function () {
    return React.DOM.span(null, "My name is: " + this.props.name);
  }
});
