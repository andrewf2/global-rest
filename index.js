var http = {
  get:function(url){
    console.log(JSON.stringify(url))
  },

  put:function(url){
    console.log(JSON.stringify(url))
  },

  post:function(url){
    console.log(JSON.stringify(url))
  },

  del:function(url){
    console.log(JSON.stringify(url))
  },

}

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

function onSuccess(response) {
  if (response) {
    return response.data;
  } else {
    onError('Invalid response format');
  }
}

function onError(err) {
  console.log(err);
}

function registerToGlobe(){
  restVerbs.forEach(function(verb){
    var requestObject
    var method = "$" + verb;
    if(verb != "put" && verb != 'post'){
      global[method] = function(id){
        var id = (id != undefined)? id : " ";
        var caller = global[method].caller.name;
        var resource = getResource(caller);
        return http[verb]({
          host:global.baseUrl,
          port:8080,
          method:verb.toUpperCase(),
          path: "/"+ resource
        },onSuccess,onError);
      }
    }
    else{
      global[method] = function(id,data){
        var id = (id != undefined)? id : " ";
        var caller = global[method].caller.name;
        var resource = getResource(caller);
        return http[verb]({
          host:global.baseUrl,
          port:8080,
          method:verb.toUpperCase(),
          data:data,
          path: "/"+ resource
        },onSuccess,onError);
      }      
    }

  })
}


module.exports = registerToGlobe();