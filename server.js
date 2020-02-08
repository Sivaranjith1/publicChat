const client = require('socket.io').listen(4000).sockets
const mongo = require('mongodb').MongoClient;

//Connect to Mongodb
mongo.connect('mongodb://127.0.0.1/publicchat', function(err, db){
    if(err) throw err

    console.log('MongoDb connected')

    //connect to Socket.io
    client.on('connection', (socket) => {
        let chat = db.db('mongochat').collection('chats')

        //function to send status
        sendStatus = (s) => {
            socket.emit('status', s)
        }

        //Get chats
        chat.find().limit(100).sort({_id: 1}).toArray((err, res) => {
            if(err) throw err

            //emit msg
            socket.emit('output', res)
        })

        //Handle input
        socket.on('input', data => {
            let name = data.name
            let message = data.message

            //check for name and message
            if(name == '' || message ==''){
                sendStatus('Please enter a name and message')
            } else {
                chat.insert({name, message}, () => {
                    client.emit('output', [data])

                    //send status
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    })
                })
            }
        })

        //handle clear
        socket.on('clear', data => {
            //remove
            chat.remove({}, () => {
                socket.emit('cleared')
            })
        })
    })
})


