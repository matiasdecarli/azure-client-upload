var azure = require("azure");
var app = require('express')();
var express = require('express');
var port = process.env.PORT || 5000;
var expiryTime = 5;

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
app.listen(port);   
console.log('listening on ',port);

function getDate(){
    var date = new Date();
    date.setHours((date).getMinutes() + expiryTime);
    return date;
}
