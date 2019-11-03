'use strict';

const fs = require('fs')
const bencode = require('bencode');
const tracker = require('./src/tracker')

tracker.getPeers(torrent, peers => {
    console.log('list of peers: ', peers)
})