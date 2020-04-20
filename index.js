const express = require('express')
const fs = require('fs');
var _ = require("underscore");

const covid = require('./data_model')
const app = express()

app.set('case sensitive routing', false);

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})
app.get('/gujarat', covid.getGujarat)
app.get('/bharuch', covid.getBharuch)
app.get('/district/all', covid.getAllDistricts)
app.get('/district/:dist', covid.getSingleDistrict
//(req, res)=>{
    // var dist_name = req.params.dist
    // dist_name = dist_name.charAt(0).toUpperCase()+dist_name.slice(1)
    // console.log(dist_name)
    // fs.readFile('covid19-districts.json', (err, data) => {
    //     if (err) throw err;
    //     let dis = JSON.parse(data);
    //     var filtered = _.where(dis.districts, {name: dist_name});
    //     res.json(filtered)
    // });
    //}
)
app.get('/update', covid.last_update)
app.get('/time', (req, res)=>{
    var d = new Date();
    var n = d.getTime();
    res.json(n)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});




// app.get('/gujarat', (req, res)=>{
//     res.sendFile(__dirname + "/covid19-gujarat.json");
// })


// app.get('/district/bharuch', (req, res)=>{
//     res.sendFile(__dirname + "/covid19-bharuch.json");
// })

// app.get('/district/all', (req, res)=>{
//     res.sendFile(__dirname + "/covid19-districts.json");
// })



