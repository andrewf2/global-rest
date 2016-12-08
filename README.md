# global-rest
The is a wreckless and contraversial REST library I wrote that caters to the laziest of developers that will go to all costs to not write the same code over and over albeit just changing the URL string a tad, who are also sicking of writing the exact same response success and error callbacks for every REST call that takes place.

Require the package only once in the entire app and create a global baseUrl and you should be good to go:

`global.baseURL = "http://some-rest-service.com";`
`require('global-rest');`


##Installation:

`npm install global-rest`


##Usage: This library is built based on the assumption you are doing your api URLs in a truly RESTful manner. Also it is dependent on how you name your functions, as long as the last word in the name of your function is the resource name you will be fine, something you probably already do

WARNING: WILL NOT WORK IN STRICT MODE....yet

```//GET: "http://some-rest-service.com/users"```
```//pass in a optional 'id' param to make a call for one user```
```
function getUsers(){
	$get();
}
```


```//PUT: "http://some-rest-service.com/profile/:id"```
```
function updateUserProfile(id){
	$put(id);
}
```

```//DELETE:  "http://some-rest-service.com/users/:id"```
```
function deleteUsers(id){
	$del(id);
}
```



