# simple-chatroom
The aim of this project is to learn MERN stack development.
MERN is a JavasScript software stack for building web apps.

<b>M</b>ongoDB

<b>E</b>xpress

<b>R</b>eact

<b>N</b>ode

## Front-end
The client is met with a login page at first. They enter their
name and press join and they are redirected to the chatroom.
Upon joining the room the client connects to the websocket
server.

### Websockets
This is a protocol that allows full-duplex communication over
a TCP connection. This means that the server can send messages
to the client without being prompted. A typical TCP connection
only allows the server to communicate to the client as a response
to a client request.

The client can send messages to the server over the websocket
connection. The server then broadcasts this message to all the
websocket connections.

Incoming messages are displayed in the feed and the user can
load previous messages using the `More` button.

## Back-end
The server sets up a websocket server that all clients connect
to. When the server recieves a message, it is broadcast to
all connections, and it saves the message in a database.
The server also exposes a RESTful API. A client makes a HTTP GET
request to the server when requesting previous messages by
sending the id number of the oldest message the client has stored
. The server queries the database with this id number and returns
the next oldest message by id.

### Database
The database is hosted on [mongoDB](http://www.mongodb.com) and 
is cleared every time the server boots up to avoid running into
limited storage caps offered by the free tier.
