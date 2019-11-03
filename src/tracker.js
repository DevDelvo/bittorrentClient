'use strict'

const dgram = require('dgram');
const Buffer = require('buffer').Buffer;
const urlParse = require('url').parse;

module.exports.getpeers = (torrent, callback) => {
    const socket = dgram.createSocket('udp4');
    const url = torrent.announce.toString('utf8');

    udpSend(socket, buildConnReq(), url);

    socket.on('message', response => {
        if (respType(response) === 'connect') {
            // receive and parse connect response
            const connResp = parseConnResp(response);
            // send announce request
            const announceReq = buildAnnounceReq(connResp.connectionId);
            udpSend(socket, announceReq, url);
        } else if (respType(response) === 'announce') {
            // parse announce response
            const announcerResp = parseAnnounceResp(response);
            // pass peers to callback
            callback(announcerResp.peers);
        }
    });
};

function udpSend(socket, message, rawUrl, callback = () => { }) {
    const url = url.parse(rawUrl);
    socket.send(message, 0, message.length, url.port, url.host, callback);
    // The socket’s send method is used for sending messages. The first argument is the message as a buffer.
    // The next two arguments let you send just part of the buffer as the message by specifying an offset and length of the buffer,
    // but if you’re just sending the whole buffer you can just set the offset to 0 and the length to the whole length of the buffer. 
    // Next is the port and host of the receiver’s url.git
    // Finally the last argument is a callback for when the message has finished sending.
}

function respType(resp) {

}

function buildConnReq() {

}

function parseConnResp(resp) {

}

function buildAnnounceReq(connId) {

}

function parseAnnounceResp(resp) {

}