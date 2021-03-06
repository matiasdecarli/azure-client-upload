var azure = require("azure");
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

//app.enable("jsonp callback");

app.get('/getsignature/:file', function(req, res){    
    var blobService = azure.createBlobService();
    blobService.createContainerIfNotExists("uploads", function(error){
        var url = blobService.generateSharedAccessSignature("uploads", req.params.file, {
        AccessPolicy : {
            Permissions : "rwdl",
            Expiry: getDate()
        }});
        res.jsonp({url: url.url()});
    });    
});

app.use(express.static(__dirname + '/public'));
app.listen(port);   
console.log('listening on ',port);

function getDate(){
    var date = new Date();
    date.setHours((date).getHours() + 1);
    return date;
}
