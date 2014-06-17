var azure = require("azure");
var app = require('express')();
var crypto = require('crypto');
var request = require('request');
var express = require('express');
var port = process.env.PORT || 1337;
app.enable("jsonp callback");

// var containerName = 'testcontainer';
// var maxAgeInSeconds = 500;

// var blobService = azure.createBlobService();
// blobService.createContainerIfNotExists(containerName, {publicAccessLevel : 'blob'}, function(error){});
// enableCORS(containerName, maxAgeInSeconds);

// app.get('/getsignature/:file', function(req, res){	
// 	var url = blobService.generateSharedAccessSignature(containerName, 'test.txt', {
// 	AccessPolicy : {
// 		Permissions : "rwdl",     
// 		Expiry : getDate()
// 	}});
// 	res.jsonp({url: url.url()});
// });

// function getDate(){
// 	var date = new Date();
// 	date.setHours((date).getHours() + 1);
// 	return date;
// }

app.use(express.static(__dirname + '/public'));
app.listen(port);	
console.log('Listening on port...' + port);

// function enableCORS() {
// 	var MY_ACCOUNT_URL = 'https://' + process.env.AZURE_STORAGE_ACCOUNT + '.blob.core.windows.net';
//     var MY_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT;
//     var MY_ACCOUNT_HOST = process.env.AZURE_STORAGE_ACCOUNT  + '.blob.core.windows.net';
//     var accountKey = process.env.AZURE_STORAGE_ACCESS_KEY;

//     var MY_CORS_XML =
//     '<?xml version="1.0" encoding="utf-8"?>'+
//         '<StorageServiceProperties>'+
//             '<Cors>'+
//                 '<CorsRule>'+
//                     '<AllowedOrigins>*</AllowedOrigins>'+
//                     '<AllowedMethods>GET,PUT,POST,DELETE,OPTIONS</AllowedMethods>'+
//                     '<MaxAgeInSeconds>' + maxAgeInSeconds + '</MaxAgeInSeconds>'+
//                     '<ExposedHeaders>x-ms-meta-data*,x-ms-meta-customheader</ExposedHeaders>'+
//                     '<AllowedHeaders>x-ms-meta-target*,x-ms-meta-customheader</AllowedHeaders>'+
//                 '</CorsRule>'+
//             '</Cors>'+
//             '<DefaultServiceVersion>2013-08-15</DefaultServiceVersion>'+
//         '</StorageServiceProperties>';


//     var url = MY_ACCOUNT_URL + '/?restype=service&comp=properties';
//     var canonicalizedResource = '/' + MY_ACCOUNT_NAME + '/?comp=properties';
//     var corsMD5 = crypto.createHash('md5' ).update(MY_CORS_XML).digest('base64');
//     var date = (new Date()).toUTCString();
//     var headers = {
//         'x-ms-version': '2013-08-15',
//         'x-ms-date': date,
//         'Host': MY_ACCOUNT_HOST,
//         'Content-Type': 'text/plain; charset=UTF-8',//Added this line
//         'Content-MD5': corsMD5,//Added this line
//     };

//     var canonicalizedHeaders = buildCanonicalizedHeaders( headers );

//     // THIS
//     var key = buildSharedKeyLite( 'PUT', corsMD5, 'text/plain; charset=UTF-8', canonicalizedHeaders, canonicalizedResource, accountKey);

//     // AND THIS, BOTH YIELD THE SAME SERVER RESPONSE
//     // var key = buildSharedKeyLite( 'PUT', "", "", canonicalizedHeaders, canonicalizedResource, accountKey);

//     headers['Authorization'] = 'SharedKeyLite ' + MY_ACCOUNT_NAME + ':' + key;

//     var options = {
//         url: url,
//         body: MY_CORS_XML,
//         headers: headers
//     };

//     console.log("url : " + url);
//     console.log("canonicalizedResource : " + canonicalizedResource);
//     console.log("canonicalizedHeaders : " + canonicalizedHeaders);
//     console.log("corsMD5 : " + corsMD5);
//     console.log("key : " + key);
//     console.log("options : " + JSON.stringify(options));

//     function onPropertiesSet(error, response, body) {
//         if (!error && response.statusCode == 202) {
//             console.log("CORS: OK");
//         }
//         else {
//             console.log("CORS: " + response.statusCode);
//         }
//     }
//     request.put(options, onPropertiesSet); // require('request')
// };

// function buildCanonicalizedHeaders( headers ) {

//     var xmsHeaders = [];
//     var canHeaders = "";

//     for ( var name in headers ) {
//         if ( name.indexOf('x-ms-') == 0 ) {
//             xmsHeaders.push( name );
//         }
//     }

//     xmsHeaders.sort();

//     for ( var i = 0; i < xmsHeaders.length; i++ ) {
//         name = xmsHeaders[i];
//         canHeaders = canHeaders + name.toLowerCase().trim() + ':' + headers[name] + '\n';
//     }
//     return canHeaders;
// }

// function buildSharedKeyLite(verb, contentMD5, contentType, canonicalizedHeaders, canonicalizedResource, accountKey) {

//     var stringToSign = verb + "\n" +
//         contentMD5 + "\n" +
//         contentType + "\n" +
//         "" + "\n" + // date is to be empty because we use x-ms-date
//         canonicalizedHeaders +
//         canonicalizedResource;

//     // return crypto.createHmac('sha256', accountKey).update(encodeURIComponent(stringToSign)).digest('base64');
//     return crypto.createHmac('sha256', new Buffer(accountKey, 'base64')).update(stringToSign).digest('base64');
// }
