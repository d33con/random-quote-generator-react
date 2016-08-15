'use strict';

var QuoteApp = React.createClass({
  displayName: 'QuoteApp',

  getInitialState: function getInitialState() {
    return {
      author: '',
      quote: ''
    };
  },

  _fillQuote: function _fillQuote(response) {
    this.setState({
      author: response.author,
      quote: response.quote
    });
  },

  _retrieveQuote: function _retrieveQuote() {
    $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
      dataType: 'json',
      cache: false,
      success: function (response) {
        this._fillQuote(response);
      }.bind(this),
      error: function (err) {
        alert(err);
      }.bind(this),
      beforeSend: function (xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "YmWL1IUGuimsh2Qayf6ZCLHY61XUp12fQb9jsnfc6SxsBLbFft");
      }.bind(this)
    });
  },
  componentDidMount: function componentDidMount() {
    this._retrieveQuote();
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(Title, null),
      React.createElement(Quote, { quote: this.state.quote, author: this.state.author }),
      React.createElement(GetNewQuote, { getNewQuote: this._retrieveQuote }),
      React.createElement(TweetQuote, { quote: this.state.quote, author: this.state.author })
    );
  }
});

var Title = React.createClass({
  displayName: 'Title',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'title' },
      React.createElement(
        'div',
        null,
        'Random Quote Generator'
      )
    );
  }
});

var Quote = React.createClass({
  displayName: 'Quote',

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'quote-container' },
        React.createElement(
          'p',
          null,
          this.props.quote
        ),
        React.createElement(
          'small',
          null,
          ' - ',
          this.props.author
        )
      )
    );
  }
});

var GetNewQuote = React.createClass({
  displayName: 'GetNewQuote',

  handleClick: function handleClick() {
    this.props.getNewQuote();
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'buttons' },
      React.createElement(
        'button',
        { className: 'btn btn-success btn-block', onClick: this.handleClick },
        'New Quote'
      )
    );
  }
});

var TweetQuote = React.createClass({
  displayName: 'TweetQuote',

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'a',
        { href: 'https://twitter.com/intent/tweet?text=' + this.props.quote + ' - ' + this.props.author, target: '_blank', className: 'btn btn-primary btn-block' },
        'Tweet',
        React.createElement('i', { className: 'fa fa-fw fa-twitter' })
      )
    );
  }
});

ReactDOM.render(React.createElement(QuoteApp, null), document.getElementById('app-container'));