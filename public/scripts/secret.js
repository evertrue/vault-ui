var SecretBox = React.createClass({
  getInitialState: function() {
    return {data: {}};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="secretBox">
        <h1>Secrets</h1>
        <SecretList data={this.state.data} />
      </div>
    );
  }
});

var SecretList = React.createClass({
  render: function() {
    var secretNodes = null;
    if (this.props.data.data) {
      secretNodes = this.props.data.data.keys.map(function(secret) {
        return (
          <Secret name={secret} key={secret}>
          </Secret>
        );
      });
    }

    return (
      <div className="secretList">
        {secretNodes}
      </div>
    );
  }
});

var Secret = React.createClass({
  getInitialState: function() {
    return {data: {}};
  },
  componentDidMount: function() {
    $.ajax({
      url: '/v1/secret/default/' + this.props.name,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var secretContentNodes = null;
    if (this.state.data.data) {
      var secretContentData = this.state.data.data;

      secretContentNodes = Object.keys(secretContentData).map(function(key) {
        var value = secretContentData[key];

        return (
          <SecretContent name={key} value={value} key={key}>
          </SecretContent>
        );
      });
    }

    return (
      <div className="secret">
        <h2 className="secretName">
          {this.props.name}
        </h2>
        {secretContentNodes}
      </div>
    );
  }
});

var SecretContent = React.createClass({
  render: function() {
    return (
      <dl className="secretContent">
        <dt>{this.props.name}</dt>
        <dd>{this.props.value}</dd>
      </dl>
    );
  }
});

ReactDOM.render(
  <SecretBox url="/v1/secret/default?list=true" />,
  document.getElementById('content')
);
