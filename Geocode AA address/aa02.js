// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync('data/m01.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

let rawData = [];
let finalData = [];
let pureAddress = [];

$('tr').each(function(i, elem) {
    if ($(elem).attr("style")=="margin-bottom:10px") {
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
    let addressline1 = data.split("</td>")[0].split("\t\t\t\t\t\t")[1].replace(" \n"," ").replace("(Basement)","").split(",")[0].split("-")[0]
    let addressline2 = data.split("</td>")[0].split("\t\t\t\t\t\t<br>")[1].replace("\n", "").replace("NY","").split(" 10")[0].trim()
    
    let postcode;
        if (data.includes("NY")) {
            postcode = "NY";
        } 
        else {
            postcode = "NY";
        }    
        
    let zipcode;
        if (data.includes("NY ")) {
            zipcode = data.split("</td>")[0].split("\t\t\t\t\t\t<br>")[1].split("NY")[1].replace("\n","").trim();
        } 
        else {
            // zipcode = "10" + data.split("</td>")[0].split("\t\t\t\t\t\t<br>")[1].replace("\n","").split(" 10")[1];
               zipcode = "10" + data.split("</td>")[0].replace("\n","").split("\n\t\t\t\t\t\t")[2].split("10")[1];
        }    

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
        
//  getting all meeting informations
//  finalData.push({
//         location: finallocation, 
//         meeting: finalmeetingname,
//         address: addressline1 + " " + addressline2 + " New York, " + postcode + " " + zipcode,
//         wheelchair: wheelchair,
//         detailbox: detailbox,
//         day : finalmeetingday,
//         time : finalstarttime + " to " + finalendtime,
//         meetingtype: finalmeetingtype,
//         specialinterest : specialinterest,
//  })
//  return finalData 
  
//  getting all address information
//  finalAddress.push({
//          address: addressline1,
//          address: addressline2,
//          address: postcode,
//          address: zipcode
//          address: addressline1 + " " + addressline2 + " " + postcode + " " + zipcode,
//   })
  
  pureAddress.push(addressline1)
  
  return pureAddress
  
};

fs.writeFileSync('/home/ec2-user/environment/finaladdress.json', JSON.stringify(pureAddress))