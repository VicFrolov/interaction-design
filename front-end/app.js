var express = require('express')
var app = express()
var Twit = require('twit')

app.use(express.static(__dirname + '/public'));

var T = new Twit({
    consumer_key:         'CO0QIryPxSTsxM5f94kzr8rby'
  , consumer_secret:      'nMuFLNd460HcJzM7xgolu3MldodNb9CmpxUr55N7ubBEAcCOQg'
  , access_token:         '35929248-6VzSZMtmRokPJqmwJ3QIWSLyzxAjJCJeHVOoyShH9'
  , access_token_secret:  'oVfSUB613mtSgsfNdrg5KbLLtlHIXwSMDnmaXiKwfSh8R'
})


// get based on search term, count, location, etc
app.get('/tw', function (req, res) {console.log(req.query.q1);
	T.get('search/tweets', { q: req.query.q1, count: 100}, function(err, data, response) {
    res.send(data);
  });
});


//
//  filter the twitter public stream by the word 'mango'.
//
app.get('/tw2', function (req, res) {
  var stream = T.stream('statuses/filter', { track: 'mango' });
  currentStream = [];
  stream.on('tweet', function (tweet) {
    currentStream.push(tweet);
  });
});

app.get('/currentStream', function (req,res) {
  res.send(currentStream);
})

var currentStream = [];


//
// get `specific` twitter users
//
app.get('/funnytw', function (req, res) {console.log(req.query);
  T.get('users/suggestions/:slug', { slug: req.query.slug }, function (err, data, response) {
    res.send(data);
  });
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});