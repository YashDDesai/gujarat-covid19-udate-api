const express = require('express')
const fs = require('fs');
var _ = require("underscore");

//let jsonData = require('./covid19-india.json')
const covid = require('./data_model')
const dis = require('./test')
const app = express()



app.set('case sensitive routing', false);
app.get('/gujarat', (req, res)=>{
    res.sendFile(__dirname + "/covid19-gujarat.json");
})
// app.get('/district/bharuch', (req, res)=>{
//     res.sendFile(__dirname + "/covid19-bharuch.json");
// })
app.get('/district/all', (req, res)=>{
    res.sendFile(__dirname + "/covid19-districts.json");
})

app.get('/district/:dist', (req, res)=>{
    var dist_name = req.params.dist
    dist_name = dist_name.charAt(0).toUpperCase()+dist_name.slice(1)
    console.log(dist_name)
    fs.readFile('covid19-districts.json', (err, data) => {
        if (err) throw err;
        let dis = JSON.parse(data);
        var filtered = _.where(dis.districts, {name: dist_name});
        res.json(filtered)
    });
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
