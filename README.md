# simple-chatroom
The aim of this project is to learn MERN stack development.

- MongoDB
- Express
- React
- Node

### WebSockets
`stream of consciousness`

basically i want to have a custom protocol on top of websockets.
when a client connects, the server knows the connection only by
its database id. when the client joins the room they give a name
but that is only known by the client. we need a way to get the
name to the server so it can update the database and the other
users can see it. also since the room request is through http and
message handling is through websockets, the server doesn't know
which room the client is sending messages to. this is probably
a bad idea if there are loads of clients sending messages to
loads of different rooms through one port but sure what can you
do. mqtt would get around this with the different topics and all
that but the free mqtt brokers were unreliable and i didn't want
to bother setting up my own one, this project is to learn mern

so far i can see there being two types of messages; a standard
message that contains the room number and the payload, and a config message that gives the name of the user to the server

i could send the messages as json but if there are loads of
messages coming in from a bunch of different clients i'm
wondering if parsing the messages is going to take too long
```javascript
{
  name: userName
}

{
  room: roomCode,
  payload: messageContents
}
```
so what if i send the message as a 

#### Byte 0

`0x00` Standard message from client to server

`0x01` Initial config message from client

