# MBTI-algorithm
MBTI-based algorithm to include in your web or mobile application to find the match rate between the users and the other 16 personality types.

## Premise
1. Include in your application inputs where the users can insert their MBTI personality types
2. Include in your application on the server side a system to retrieve the results of the algorithm and to send it from the sever-side to the client-side of your application.
   <br>Example:
```
//Code in php
   $data = array('a' => $a, //first letter of the input user's MBTI
                 'b' => $b, //second letter of the input user's MBTI
                 'c' => $c, //third letter of the input user's MBTI
                 'd' => $d); //fourth letter of the input user's MBTI
              
    $json_data = json_encode($data);
    $url = 'https://localhost:5000/process_data'; //the cURL where your Flask App or Node JS application is (it's your API/The algorithm script)
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($json_data)
    ));
    $response = curl_exec($ch);
            
            
            
            
    curl_close($ch);
     #echo $response;
    $response_array = json_decode($response, true);
   
```

## Packages
For **Python** scripting code:

1. Python
2. Flask App

For **Javascript** scripting code:

1. Node.js
2. Express.js

## License
Only personal use. For any other use, please contact me here: https://forms.gle/G7TLUy2CUyBaNEEy7 .
