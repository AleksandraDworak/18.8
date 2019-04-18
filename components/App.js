var prefix = "https://cors-anywhere.herokuapp.com/";
var GIPHY_API_URL= 'https://api.giphy.com';
var GIPHY_PUB_KEY= 'zHbcILeDTaeF8Mqq673l89Fl4zouPV0z'


App = React.createClass({

getInitialState() {
    return {
        loading: false,
        searchingText: '',
        gif: {}
    };
},

handleSearch: function(searchingText) {  
    this.setState({
      loading: true  
    });
    this.getGif(searchingText)
    .then(response => this.displayGif(response, searchingText));  
},

displayGif: function(gif, searchingText){
    this.setState({ 
        loading: false,  
        searchingText: searchingText,
        gif: gif
    })
    },

getGif: function(searchingText) {  
  var url = prefix + GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  
  var request = new XMLHttpRequest(); 
  
  return new Promise(function (resolve, reject) {
  request.onload = function() {
      if (request.status === 200) {
         var data = JSON.parse(request.responseText).data; 
          var gif = {  
              url: data.fixed_width_downsampled_url,
              sourceUrl: data.url
          };
          resolve(gif);
         
          
      } else {
        reject({
            status: request.status,
            statusText: request.statusText
        });
    }
  };
  
  request.open('GET', url);
  request.send();
});
},




render: function() {

    var styles = {
        margin: '0 auto',
        textAlign: 'center',
        width: '90%'
    };
    return (
        <div style={styles}>
            <h1>Wyszukiwarka gifów</h1>
            <p>Znajdź gifa. Naciśnij enter, aby zobaczyć kolejne gify.</p>   
               <Search onSearch={this.handleSearch}/>
               <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}/>
        </div>
    );
}
});