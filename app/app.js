const { Observable, Observer } = require('./Models/observable.js');
const express = require('express');
const { EventEmitter } = require('events');

const app = express();

const eventEmitter = new EventEmitter();

const observable = new Observable();

const observer1 = new Observer();
const observer2 = new Observer();

observable.add(observer1);
observable.add(observer2);

app.use((req, res, next) => {
    const user = {name:"thomas"};
    const about = {title:'google inc'};

    const endpoint = req.path.slice(1);

    switch (endpoint) {
        case 'users':
            eventEmitter.emit('user_data', { user });
            next();
            break;
        case 'about':
            eventEmitter.emit('about_data', { about });
            next();
            break;
        default:
            res.send('No endpoint');
            next();
    }
});
  
app.use((req, res, next) => {

    eventEmitter.on('user_data', data => {
        observer1.update('Data: ' + data);
    });

    eventEmitter.on('about_data', data => {
        observer1.update(data);
    });

    next();
});

app.get('/', (req, res) => {
    res.send("<h1>Page d'accueil</h1>");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});