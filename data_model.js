var Xray = require('x-ray');  
const reQ = require('request')
var _ = require("underscore");



var x = Xray({
    filters: {
      whiteSpaces: function (value) {
        return typeof value === 'string' ? value.replace(/ +/g, ' ').trim() : value
      }
    }
  });

var url = "https://gujcovid19.gujarat.gov.in/";



exports.getSingleDistrict = (req, res)=>{
    var dist_name = req.params.dist
    dist_name = dist_name.charAt(0).toUpperCase()+dist_name.slice(1)
    console.log(dist_name)


    let options = {json: true}
    let jsonURL = `https://${req.hostname}/district/all`
    console.log(jsonURL)
    reQ(jsonURL, options, (error, response, body)=>{
         if(error) console.log(error)
        var filtered = _.where(body.districts, {name: dist_name});
        console.log(filtered)
        res.json(filtered)
     })
    // .then(res=>res.json())
    // .then((data)=>{
    //     console.log(data)
    //     // if (err) throw err;
    //     let dis = JSON.parse(data.body);
    //     var filtered = _.where(dis.districts, {name: dist_name});
        
    //     res.json(filtered)
    // })
}


exports.getGujarat = (req, res)=>{
    x(
        url,
        '.container-fluid',
        {
            confirmed:{
                total:'#ctl00_body_h3TotalConfirmedCount | whiteSpaces', 
                new:'#ctl00_body_SubConfirmedDiff | whiteSpaces'
            },
            tested:{
                total:'#ctl00_body_h3PatientTestedCount | whiteSpaces',
                new:'#ctl00_body_SubPatientTestedDiff | whiteSpaces'
            },
            recovered:{
                total:'#ctl00_body_h3PatientCuredCount | whiteSpaces',
                new:'#ctl00_body_SubPatientCuredDiff | whiteSpaces'
            },
            quarantined:'#ctl00_body_h3PeopleQuarantineCount | whiteSpaces',
            deaths:{
                total:'#ctl00_body_h3TotalDath | whiteSpaces',
                new:'#ctl00_body_SubTotalDeathDiff | whiteSpaces',
            }
        } 
    ).then(function(data){
        res.json(data)
    })
    // .write('covid19-gujarat.json')
}

exports.getBharuch = (req, res)=>{
    x(
        url,
        '#ctl00_body_dvDISTGRID',       
        {
            confirmed:{
                total:'tr:nth-child(7) td:nth-child(2) span.text-red | whiteSpaces', 
                new: 'tr:nth-child(7) td:nth-child(2) sub.text-red | whiteSpaces'
            },
            tested:{
                total:'tr:nth-child(7) td:nth-child(3) span.text-orange | whiteSpaces', 
                new: 'tr:nth-child(7) td:nth-child(3) sub.text-orange | whiteSpaces'
            },
            recovered:{
                total:'tr:nth-child(7) td:nth-child(4) span.text-success | whiteSpaces', 
                new: 'tr:nth-child(7) td:nth-child(4) sub.text-success | whiteSpaces'
            },
            quarantined:'tr:nth-child(7) td:nth-child(5) span.text-blue | whiteSpaces', 
            deaths:'tr:nth-child(7) td:nth-child(6) span | whiteSpaces'
        } 
    ).then(function(data){
        res.json(data)
    })
    // .write('covid19-bharuch.json')
}


exports.getAllDistricts = (req, res)=>{
    x(
        url,
        '#ctl00_body_dvDISTGRID',
        {
        districts: x('tr', [{
            name:'td:nth-child(1)  | whiteSpaces',
            confirmed:{
                total:'td:nth-child(2) span.text-red | whiteSpaces', 
                new: 'td:nth-child(2) sub.text-red | whiteSpaces'
            },
            tested:{
                total:'td:nth-child(3) span.text-orange | whiteSpaces', 
                new: 'td:nth-child(3) sub.text-orange | whiteSpaces'
            },
            recovered:{
                total:'td:nth-child(4) span.text-success | whiteSpaces', 
                new: 'td:nth-child(4) sub.text-success | whiteSpaces'
            },
            quarantined:'td:nth-child(5) span.text-blue | whiteSpaces', 
            deaths:{
                total:'td:nth-child(6) span | whiteSpaces',
                new:'td:nth-child(6) sub'
            }
        }])
    }
    
    )//.write('covid19-districts.json')
    .then(function(data) {
        res.json(data) // prints first result
      })
    // .write('covid19-d.json')
    
}




exports.last_update = (req, res)=>{
    x(
        url,
        '.card-title',{
        last_update:'#ctl00_body_lblDate'
    }) .then(function(data) {
           // console.log(data) // prints first result
            res.json(data.last_update)
        })
}
     //.write('covid19-d.json')