var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var port    = Process.env.PORT || 8080;

app.get('/scrape', function(req, res){

	url = 'http://fiskal.depkeu.go.id/dw-kurs-db.asp';
	var json = [];
	var currency, description, rate;
  	request(url, function(error, response, html){
		if(!error){
	        var $ = cheerio.load(html);
	        
	        $('.table-responsive').find('tr').each(function(){
	        	var data = $(this);
	        	description = data.children().first().next().next().text();
	        	currency = description.match('\\(.+\\)')[0].replace(/[()]/g,'');
	        	rate = data.children().first().next().next().next().text();
	        	rate = rate.replace(',','');
	        	json.push({ currency : currency, description : description, rate : rate});
	        });

  			
  			res.send(json);
	    }
  	})

});

app.listen(port, function() {
	console.log('Magic happens on port 8080');
});



exports = module.exports = app;