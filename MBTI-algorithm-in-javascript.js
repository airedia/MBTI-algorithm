//Author: Angela Iredia

//Template of the MBTI-algorithm in Javascript
//For post requests on the server-side, use Node.js server with Express.js as the web framework



//start of the time-complexity
var start = 0;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let a, b, c, d; 

app.post('/process_data', (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    // Extract data from the JSON request
    a = data.a; // user's first letter of their MBTI personality type
    b = data.b; // user's second letter of their MBTI personality type
    c = data.c; // user's third letter of their MBTI personality type
    d = data.d; // user's fourth letter of their MBTI personality type

    // Check if any required parameters are missing
    if (a === undefined || b === undefined || c === undefined || d === undefined) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    let q = 12.5;
    let r = 12.5;
    let s = 12.5;
    let t = 12.5;

    let mbti_user;
    let mbti_server;

    mbti_user = [[a,q], [b,r], [c,s], [d, t]];

    mbti_server ={
        1: [["I",q], ["N",r], ["T",s], ["J",t]],
        2: [["I",q], ["N",r], ["T",s], ["P",t]],
        3: [["E",q], ["N",r], ["T",s], ["J",t]],
        4: [["E",q], ["N",r], ["T",s], ["P",t]],
        5: [["I",q], ["N",r], ["F",s], ["J",t]],
        6: [["I",q], ["N",r], ["F",s], ["P",t]],
        7: [["E",q], ["N",r], ["F",s], ["J",t]],
        8: [["E",q], ["N",r], ["F",s], ["P",t]],
        9: [["I",q], ["S",r], ["T",s], ["J",t]],
        10:[["I",q], ["S",r], ["F",s], ["J",t]],
        11:[["E",q], ["S",r], ["T",s], ["J",t]],
        12:[["E",q], ["S",r], ["F",s], ["J",t]],
        13:[["I",q], ["S",r], ["T",s], ["P",t]],
        14:[["I",q], ["S",r], ["F",s], ["P",t]],
        15:[["E",q], ["S",r], ["T",s], ["P",t]],
        16:[["E",q], ["S",r], ["F",s], ["P",t]]
    }

    function findMatch(mbti_server, mbti_user){
        var matches = [];

        for (key in mbti_server){
            var lst = mbti_server[key];
            if (mbti_user[0][0] == lst[0][0]){
                u = mbti_user[0][1] + lst[0][1]
            }
            else{
                u = 0;
            }
            if (mbti_user[1][0] == lst[1][0]){
                x = mbti_user[1][1] + lst[1][1]
            }
            
            else{
                x = 0;
            }
            
            if (mbti_user[2][0] == lst[2][0]){
                y = mbti_user[2][1] + lst[2][1]
            }
            else{
                y = 0;
            }
            
            if (mbti_user[3][0] == lst[3][0]){
               z = mbti_user[3][1] + lst[3][1] 
            }
            else{
                z = 0;
            }

           var match_rate = u + x + y + z ;

           if (match_rate >= 50){
                var result = {
                                1: lst[0][0],
                                2: lst[1][0],
                                3: lst[2][0],
                                4: lst[3][0],  
                                5: match_rate
                            }

                matches.push(result);
           }
        }

        if (matches.length > 0){
            return res.status(200).json(matches);
            } 
            else {
            return res.status(404).json({ message: 'No matches found' });
            }
                    
        }


    return findMatch(mbti_server,mbti_user);

    
    }

    else if (req.method === 'GET'){
        var result = "It uses also GET request";

        return result;
    }


    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
});

//time complexity
var end = performance.now();
var time_c = end - start;
var time ="Results found in: " + time_c + " s";

print(time);

const port = 3000; // Set the desired port number
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
