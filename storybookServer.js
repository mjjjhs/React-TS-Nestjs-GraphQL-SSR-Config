const express = require('express');
const app = express();

// Middlewares for serving static files
app.use('/storybook', express.static('.out'));
app.use('/common/storybook', express.static('node_modules/@lqt/lqt-ui/.out'));

// Routes
app.get('/', (req, res) => res.redirect('/storybook'));
app.get('/storybook', (req, res) => res.sendFile(__dirname + '/.out/index.html'));
app.get('/common/storybook', (req, res) => res.sendFile(__dirname + '/node_modules/@lqt/lqt-ui/.out/index.html'));
app.get('/health', (req, res) => res.sendStatus(200));

// TODO. version 별로 다른 파일 연결 (dynamic routes)
// app.get('/common/storybook/:version', (req, res) => res.sendFile(__dirname + '/node_modules/@lqt/lqt-ui/.out/index.html'));

const port = process.env.PORT || 6006;
app.listen(port, err => {
    if(err) throw err;
    console.log(`> 🚀 [STORYBOOK] Ready on port ${port}...`);
});