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
    resolve(response.data.data);
  } else {
    onError('Invalid response format');
  }
}

function onError(err) {
  reject(err);
}

function registerToGlobe(){
  restVerbs.forEach(function(verb){
    var method = "$" + verb;
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
  })
}


module.exports = registerToGlobe();