'use strict';

const fs = require('fs')
const bencode = require('bencode');

const dgram = require('dgram');
const Buffer = require('buffer').Buffer;
const urlParse = require('url').parse;

const torrent = bencode.decode(fs.readFileSync('./torrents/testTorrent.torrent'));
const url = urlParse(torrent.announce.toString('utf8'));

const socket = dgram.createSocket('udp4');

const myMsg = Buffer.from('hello?', 'utf8');

socket.send(myMsg, 0, myMsg.length, url.port, url.host, () => { });
// The socket’s send method is used for sending messages. The first argument is the message as a buffer.
// The next two arguments let you send just part of the buffer as the message by specifying an offset and length of the buffer,
// but if you’re just sending the whole buffer you can just set the offset to 0 and the length to the whole length of the buffer. 
// Next is the port and host of the receiver’s url.
// Finally the last argument is a callback for when the message has finished sending.

socket.on('message', msg => {
    console.log('message is', msg)
})