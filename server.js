var azure = require("azure");
var app = require('express')();
var express = require('express');
app.enable("jsonp callback");

var blobService = azure.createBlobService();
blobService.createContainerIfNotExists("uploads", function(error){});

app.get('/getsignature/:file', function(req, res){
    var url = blobService.generateSharedAccessSignature("uploads", req.params.file, {
    AccessPolicy : {
        Permissions : "rwdl",
        Expiry : getDate()
    }});
    res.jsonp({url: url.url()});
});

app.use(express.static(__dirname + '/public'));
app.listen(1337);   
console.log('listening on 1337');

function getDate(){
    var date = new Date();
    date.setHours((date).getHours() + 2);
    return date;
}
