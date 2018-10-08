import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {posts: {}};
    }
    callApi() {
        fetch('https://thewirecutter.com/wp-json/wp/v2/posts')
            .then((result) => {
                return result.json();
            }).then((jsonResult) => {
                console.log(jsonResult);
                this.setState({posts: jsonResult});
            });
    }

    postBody(k, v) {
        var pst = this.state.posts;
        var container = [];
        for (var key in pst) {
            if (pst[key]) {
                var body = renderHTML(pst[key]['content']['rendered']);
                container.push(<div key={pst[key]['id']}><h3>{pst[key]['title']['rendered']}</h3><div>{body}</div></div>);
            }
        }
    
        return container;
    }

    render() {
    
        return (
            <div className="App">
                <button onClick={() => this.callApi()}>
                Click here! I pull API data!
                </button>
                <div>{this.postBody()}</div>

            </div>
        );
    }
}

export default App;


