var express = require('express');
var router = express.Router();
var request = require('request');



/* GET home page. */
router.get('/', function(req, res, next) {
    request('http://pokeapi.co/api/v2/pokemon/?limit=7&offset=0', function (error, response, body) {
        var  tab = [];
        var newJson = JSON.parse(body);
        newJson = newJson.results;
        var i = 0;
        newJson.forEach(element => {
            request(element.url, function(error2, response2, body2){
                var body3 = JSON.parse(body2);
                var pokemon = {id:body3.id, photo: body3.sprites.front_default, name: body3.name}
                tab.push(pokemon);
                i++;
                if(i === newJson.length){
                    tab.sort(function(a,b){
                        var keyA = a.id,
                            keyB = b.id;
                        if(keyA < keyB) return -1;
                        if(keyA > keyB) return 1;
                        return 0; 
                      })
                    res.render('pokemon', {poke: tab});
                    tab = [];
                }
            })
        });
    });
});
router.post('/add', function(req, res, next) { 
    var id = req.body.id;
    var url = 'http://pokeapi.co/api/v2/pokemon/?limit=3&offset='+id;
    request(url , function (error, response, body) {
        var  tab = [];
        var newJson = JSON.parse(body);
        newJson = newJson.results;
        var i = 0;
        newJson.forEach(element => {
            request(element.url, function(error2, response2, body2){
                var body3 = JSON.parse(body2);
                var pokemon = {id:body3.id, photo: body3.sprites.front_default, name: body3.name}
                tab.push(pokemon);
                i++;
                if(i === newJson.length){
                    tab.sort(function(a,b){
                        var keyA = a.id,
                            keyB = b.id;
                        if(keyA < keyB) return -1;
                        if(keyA > keyB) return 1;
                        return 0; 
                      })
                    res.send(tab);
                    tab = [];
                }
            })
        });
    });
});

module.exports = router;
