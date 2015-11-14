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
      descending : false,
      edit :  null // {row: index, column: index}
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
  _showEditor: function(e) {
    this.setState({edit: {
      row: parseInt(e.target.dataset.row, 10),
      cell: e.target.cellIndex
    }});
  },
  _save: function (e) {
    debugger;
    e.preventDefault();
    var input = e.target.firstChild;
    // clone the data
    var data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.column] = input.value;

    // set stae to rerender UI
    this.setState({
      edit : null, // done editing
      data : data
    });
  },
  render : function() {
    var self = this;
    return (
      React.DOM.table(null,
        React.DOM.thead({onClick: self._sort},
          React.DOM.tr(null,
            self.props.headers.map(function(title, idx) {
              if (self.state.sortby === idx) {
                title += self.state.descending ? '\u2191' : '\u2193'
              }
              return React.DOM.th({key: idx}, title);
            }.bind(self))
          )
        ),
        React.DOM.tbody({onDoubleClick: self._showEditor},
          self.state.data.map(function (row, rowidx) {
            return (
              React.DOM.tr({key: rowidx},
                row.map(function (cell, idx) {
                  var content = cell;

                  // turn `content` into an input
                  // if the `idx` and the `rowidx` match the one being edited
                  // otherwise just show the text content
                  var edit = self.state.edit;
                  if (edit && edit.row === rowidx && edit.cell === idx) {
                    var content = React.DOM.form({onSubmit: self._save},
                      React.DOM.input({
                        type: 'text',
                        defaultValue: content
                      })
                    );
                  }
                  return React.DOM.td({
                    key: idx,
                    'data-row': rowidx
                  }, content);
                })
              )
            );
          })
        )
      )
    );
  }
});
