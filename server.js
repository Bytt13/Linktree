const express = require('express');
const fs  = require('fs'); //Module to interact with other archives
const path = require('path');
const app = express();
const PORT = 3000; //port where the server will run
//-------------------------------------------------Middlewares--------------------------------------------
//public
app.use(express.static('public'));
//to read the JSON
app.use(express.json());
//-------------------------------------------------Config-------------------------------------------------
const LINKS_FILE = path.join(__dirname, 'data', 'links.json');
const ADMIN_PASSWORD = "senha";//In a real project, i would use an envioroment variable
//-------------------------------------------------Routes-------------------------------------------------
//Route 1 (Public page)
app.get('/api/links', (req, res) => {
    fs.readFile(LINKS_FILE, 'utf8', (err,data) => {
        if(err) return res.status(500).send('Error reading the links');
        res.json(JSON.parse(data));
    });
});
//Route 2 (Login)
app.post('/api/login', (req, res) => {
    const {password} = req.body;

    if(password == ADMIN_PASSWORD)
    {
        //if the password is correct, we send a token
        res.json({success:true, token: 'token-for-validation'});
    }
    else
    {
        res.status(401).json({success:false, message: 'Password Incorrect'});
    }
});
//Route 3 (Add New link)(Protected Action)
app.post('/api/links', (req, res) => {
    //Simple validatioon of the token
    if(req.headers.authorization !== 'token-for-validation') return res.status(403).send('Access Denied');
    fs.readFile(LINKS_FILE, 'utf8', (err, data) => {
        if(err)return res.status(500).send('Error reading the links');

        const links = JSON.parse(data);
        const newLink = {
            id:Date.now(), //Unique ID based on time
            title:req.body.title,
            url:req.body.url
        };
        
        links.push(newLink);

        fs.writeFile(LINKS_FILE, JSON.stringify(links, null, 2), (err) => {
            if(err) return res.status(500).send('Error saving the link')
            res.status(201).json(newLink);
        });
    });
});
//Route 4 (Deleting a link)(Protected Action)
app.delete('/api/links/:id', (req, res) => {
    if(req.headers.authorization !== 'token-for-validation') return res.status(403).send('Access Denied');
    fs.readFile(LINKS_FILE, 'utf8', (err, data) => {
        if(err) return res.status(500).send('Error reading the links');

        const linkId= parseInt(req.params.id, 10);
        let links = JSON.parse(data);
        const filteredLinks = links.filter(link => link.id !== linkId);

        fs.writeFile(LINKS_FILE, JSON.stringify(filteredLinks, null, 2), (err) => {
            if(err) return res.status(500).send('Error deleting the links');
            res.status(200).send('link deleted successfully');
        });
    });
});
//Route 5 (Editing a link)(Protected Action)
app.put('/api/links/:id', (req, res) => {
    if(req.headers.authorization !== 'token-for-validation') return res.status(403).send('Access Denied');

    const linkId= parseInt(req.params.id, 10);
    const {title, url} = req.body;

    fs.readFile(LINKS_FILE, 'utf8', (err, data) => {
        if(err) return res.status(500).send('Error reading the links');

        let links = JSON.parse(data);
        const linkIndex = links.findIndex(link => link.id === linkId);

        if(linkIndex === -1) return res.status(404).send('Link not found');
        
        links[linkIndex].title = title;
        links[linkIndex].url = url;

        fs.writeFile(LINKS_FILE, JSON.stringify(links, null, 2), (err) => {
            if(err) return res.status(500).send('Error saving the edits');
            res.status(200).send('link edited successfully');
        });
    });
});
//run the server
app.listen(PORT, () => {
    console.log(`Server running in https://localhost:${PORT}`);
});