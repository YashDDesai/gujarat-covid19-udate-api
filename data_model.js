var Xray = require('x-ray');  

var x = Xray({
    filters: {
      whiteSpaces: function (value) {
        return typeof value === 'string' ? value.replace(/ +/g, ' ').trim() : value
      }
    }
  });

var url = "https://gujcovid19.gujarat.gov.in/";


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
).write('covid19-gujarat.json')

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
).write('covid19-bharuch.json')


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
        deaths:'td:nth-child(6) span | whiteSpaces'
    }])
}

).write('covid19-districts.json')
// .then(function(res) {
//     console.log(res) // prints first result
//   })
// .write('covid19-d.json')



