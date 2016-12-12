var request = require('request');
var id,data;
var restVerbs = ['get','put','post','delete'];

function getResource(str){
  var resource = "";
  for(var i = str.length-1; i >= 0; i--){
    if(str.charAt(i) === str.charAt(i).toUpperCase()){ 
      for(var j = i; j <= str.length-1; j++){
        resource += str.charAt(j);
      }
      break;
    }
  }
  return resource.toLowerCase();
}

function buildParam(param){
  var paramsMap = {
    number:function(){
      id = param;
    },   
    string:function(){
      id = param;
    },
    object: function(){
      data = param;
    }
  }
  paramsMap[typeof param]();
}

function buildParams(args){
  for(var arg in args){
    buildParam(args[arg]);
  }
}
function registerToGlobe(){
  restVerbs.forEach(function(verb){
    var requestObject;
    var method = "$" + verb;
    if(verb == 'del'){
        verb = 'delete';
    }
    global[method] = function(){
      if(global[method].arguments[0] != undefined){
        buildParams(global[method].arguments)
      }
      
      id = (id != undefined && typeof id == 'string')? "/" + id : "";
      var resource = getResource(global[method].caller.name);
      return new Promise(function(resolve,reject){
        request[verb]({url:global.baseUrl + '/' + resource + id, form: data},function(err,response,body){
          var payload = {
            err:err,
            body:body,
            response:response
          }
          if(!payload.err){
            resolve(payload)
          }
          else{
            reject(payload.err)
          }
        });
      })
    }      
  })
}

module.exports = registerToGlobe();