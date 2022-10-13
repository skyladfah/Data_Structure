// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync('data/m01.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

let rawData = [];
let finalData = []

$('tr').each(function(i, elem) {
    if ($(elem).attr("style")=="margin-bottom:10px") {
        // console.log($(elem).html());
        // console.log('*************')
        // var thisMeeting = {}; // Your function and data collection go here!
        let rawData = $(elem).html();
        let finalData = dataParser(rawData);
        console.log(finalData)
    }
});

function dataParser(data){
  
    // getting location
    let finallocation = data.split("</td>")[0].split("</h4>")[0].split('">')[2]
    
    // getting meetingname
    let finalmeetingname = data.split("</td>")[0].split("<br>\n\t\t\t\t  \t    <b>")[1].split("</b><br>\n")[0].replace("-","").trim()
    
    //getting address
    let addressline1 = data.split("</td>")[0].split("\t\t\t\t\t\t")[1].replace(" \n"," ").trim()
    let addressline2 = data.split("</td>")[0].split("\t\t\t\t\t\t<br>")[1].replace("\n", "")
    
    //getting wheelchair
    let wheelchair;
        if (data.includes("Wheelchair Access")) {
            wheelchair = "Wheelchair access";
        } 
        else {
            wheelchair = "No wheelchair access";
        }
        
    //getting detail box
    let detailbox;
        if (data.includes("detailsBox")) {
            detailbox = data.split("</td>")[0].split("> \n")[1].split("</div>")[0].replace("                        \t","").replace("\n","").replace("<br>","").trim();
        } 
        else {
            detailbox = "none";
        }
        
    //getting meeting details
    let finalmeetingday = data.split("</td>")[1].split("\t\t\t\t  \t    <b>")[1].split("From</b>")[0].trim()
    let finalstarttime = data.split("</td>")[1].split("From</b>")[1].split("<b>to</b>")[0].trim()
    let finalendtime = data.split("</td>")[1].split("From</b>")[1].split("<b>to</b>")[0].trim()
    let finalmeetingtype = data.split("</td>")[1].split("<b>Meeting Type</b>")[1].split("\n")[0].split("<br><b>")[0].trim()
    
    //getting detail box
    let specialinterest;    
        if (data.includes("Special Interest")) {
            specialinterest = data.split("</td>")[1].split("<b>Special Interest</b>")[1].split("\n")[0].trim();
        }
        else {
            specialinterest = "none"
        }


    finalData.push({
        location: finallocation, 
        meeting: finalmeetingname,
        address: addressline1 + " " + addressline2,
        wheelchair: wheelchair,
        detailbox: detailbox,
        day : finalmeetingday,
        time : finalstarttime + " to " + finalendtime,
        meetingtype: finalmeetingtype,
        specialinterest : specialinterest,
    })
    
  return finalData  
};
