const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

const path = require('path')

let chats = [{
    name: "superwebteam",
    msgs: [
        {
            name: 'ru51a4',
            text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне'
        },
    ]
}, {
    name: "minimal_react",
    msgs: [
        {
            name: 'ru51a4',
            text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне'
        },
    ]
}
];



app.use('/', express.static(path.join(__dirname, 'front')))

app.get('/getChats', function (req, res) {
    res.send(chats.map((c) => { return { name: c.name } }));
});

app.get('/getMessages', function (req, res) {
    let chat = req.query.chat
    let a = chats.find((c) => c.name == chat)
    res.send((a) ? a.msgs : []);
});


io.on('connection', (socket) => {
    chats.map((c) => c.name).forEach((asd) => {
        socket.on(asd, ({ t, u }) => {
            let $kek = chats.find((c) => c.name == asd);
            if ($kek.msgs.length > 100) {
                $kek.msgs = $kek.msgs.filter((c, i) => i > 10);
            }
            $kek.msgs.push({ 'name': u, text: t })

            io.emit(asd, "upd");
        });
    });

});

server.listen(3000, () => {
    console.log('listening on *:3000');
});