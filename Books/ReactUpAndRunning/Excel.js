var Excel = React.createClass({
  propTypes : {
    headers : React.PropTypes.arrayOf(React.PropTypes.string),
    initialData : React.PropTypes.arrayOf(React.PropTypes.string)
  },
  displayName : 'Excel',
  getInitialState: function() {
    return {
      data : this.props.intialData,
      sortby : null,
      descending : false
    };
  },

  _sort : function (e) {

    var column = e.target.cellIndex;
    var descending = this.state.sortby === column && !this.state.descending;
    // copy the data
    var data = this.state.data.slice();

    data.sort(function (a,b) {
      return descending ? a[column] < b[column] : a[column] > b[column];
    });

    this.setState({
      data : data,
      sortby : column,
      descending : descending
    });
  },
  render: function() {
  return (
    React.DOM.table(null,
      React.DOM.thead({onClick: this._sort},
        React.DOM.tr(null,
          this.props.headers.map(function(title, idx) {
            if (this.state.sortby === idx) {
              title += this.state.descending ? '\u2191' : '\u2193'
            }
            return React.DOM.th({key: idx}, title);
          }.bind(this))
        )
      ),
      React.DOM.tbody(null,
        this.state.data.map(function (row, idx) {
          return (
            React.DOM.tr({key: idx},
              row.map(function (cell, idx) {
                return React.DOM.td({key: idx}, cell);
              })
            )
          );
        })
      )
    )
  );
}
});
