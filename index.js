var request = require('request');

var restVerbs = ['get','put','post','del'];

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

function onSuccess(err,response,body) {
  //console.log(response);
  console.log(body);
  
};
  

function onError(err) {
  console.log(err);
}

function registerToGlobe(){
  restVerbs.forEach(function(verb){
    var requestObject

    var method = "$" + verb;
    if(verb != "put" && verb != 'post'){
      if(verb == 'del'){
        verb = 'delete';
      }
      global[method] = function(id){
        var id = (id != undefined)? "/" + id : "";
        var caller = global[method].caller.name;
        var resource = getResource(caller);
        console.log(global.baseUrl + '/' + resource+id)
        return request[verb](global.baseUrl + '/' + resource+id,onSuccess);
      }
    }
    else{
      global[method] = function(id,data){
        if(typeof id == 'object'){
          var data = id;
          id = "";
        }
        var id = (id != undefined && typeof id == 'string')? "/" + id : "";
        var caller = global[method].caller.name;
        var resource = getResource(caller);
        return request[verb]({url:global.baseUrl + '/' + resource + id, form: data},onSuccess);
      }      
    }

  })
}


module.exports = registerToGlobe();