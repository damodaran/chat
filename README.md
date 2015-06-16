# chat
Chat application using  nodejs + expressjs + socketio

Create an express application named chatApp


```
$ express chatApp

   create : chatApp
   create : chatApp/package.json
   create : chatApp/app.js
   create : chatApp/public
   create : chatApp/public/stylesheets
   create : chatApp/public/stylesheets/style.css
   create : chatApp/public/images
   create : chatApp/routes
   create : chatApp/routes/index.js
   create : chatApp/routes/users.js
   create : chatApp/views
   create : chatApp/views/index.jade
   create : chatApp/views/layout.jade
   create : chatApp/views/error.jade
   create : chatApp/bin
   create : chatApp/bin/www
   create : chatApp/public/javascripts

   install dependencies:
     $ cd chatApp && npm install

   run the app:
     $ DEBUG=chatApp ./bin/www

```

Move to the application folder.

```
$ cd chatApp/

```
Just check the files created inside

```
$ ls

```
Now we need to install the dependencies. Dependencies are listed in the package.json. The current content of package.json file is

```
{
  "name": "chatApp",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "express": "~4.9.0",
    "body-parser": "~1.8.1",
    "cookie-parser": "~1.3.3",
    "morgan": "~1.3.0",
    "serve-favicon": "~2.1.3",
    "debug": "~2.0.0",
    "jade": "~1.6.0"
  }
}

```
To install the dependencies use the folling command.

```
$ npm install

```

Now if you check the app.js file you can find lots of code. Remove everything and add the following code
	
	var app = require('express')();
	var http = require('http').Server(app);

	http.listen(3000, function(){
	  console.log('listening on port:3000');
	});

Run the application using

```
$ node app.js

```
listening on port:3000

Create an index page with the following code and save the file with name index.html
	
	<!DOCTYPE html>
	<html>
	<head>
		<title>Welcome to InApp</title>
	</head>
		<body>
		    Hello world
		</body>
	</html>

Now in the app.js we need to set the router for the index.html. For this add the following code inside the app.js

	app.get('/', function(req, res){
	  res.sendfile('index.html');
	});

$ node app.js

listening on port:3000

Now check the URL http://localhost:3000/
Now we need to install the socket.io. You can install socket.io using the following command

$ npm install --save socket.io

Now check the package.json and you can find that the socket.io is added to it with the version.

	{
	  "name": "chat",
	  "version": "0.0.0",
	  "private": true,
	  "scripts": {
	    "start": "node ./bin/www"
	  },
	  "dependencies": {
	    "body-parser": "~1.8.1",
	    "cookie-parser": "~1.3.3",
	    "debug": "~2.0.0",
	    "express": "~4.9.0",
	    "jade": "~1.6.0",
	    "morgan": "~1.3.0",
	    "serve-favicon": "~2.1.3",
	    "socket.io": "^1.3.5"
	  }
	}

Add socket.io into HTML code using 
	
	<script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>

and update index.html with the following code
	
	<script type="text/javascript">
			var socket = io();
	</script>

Update app.js with the following code

	io.on('connection', function(socket){
		console.log('New client is connected to the server');
	});

Now update index.html with input box and send button

	<!DOCTYPE html>
	<html>
	<head>
		<title>Welcome to InApp</title>
	</head>
		<body>
		    <ul id="messages"></ul>
		    <form action="">
		      <input id="m" autocomplete="off" /><button>Send</button>
		    </form>
			<script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
			<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
			<script type="text/javascript">
				var socket = io();
				var name = window.prompt("What is your name?");
				socket.emit('login', name);	
					

				  $('form').submit(function(){
				    socket.emit('sendMsg',{by:name, msg: $('#m').val()});
				    $('#m').val('');
				    return false;
				  });
				  
				  socket.on('newUser', function(name){
				    $('#messages').append($('<li>').text(name +" is online"));
				  });
				  socket.on('getMsg', function(res){
				    $('#messages').append($('<li>').text(res.by +": "+res.msg ));
				  });
			</script>
		</body>
	</html>

I will update the full script as soon as possible.

$ node app.js
