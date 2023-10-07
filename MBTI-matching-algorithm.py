# -*- coding: utf-8 -*-
#author: Angela Iredia


import time
from flask import Flask, request, jsonify

#time complexity
start = time.time()

app = Flask(__name__)

@app.route('/process_data', methods=['GET', 'POST'])
def process_data():
    if request.method == 'POST':    
        data = request.json
        global a,b,c,d
        a = data.get('a')
        b = data.get('b')
        c = data.get('c')
        d = data.get('d')

        if None in (a, b, c, d):
            return jsonify({'error': 'Missing required parameters'}), 400

        q = 12.5
        r = 12.5
        s = 12.5
        t = 12.5

        global mbti_user, mbti_server
        mbti_user = [[a,q], [b,r], [c,s], [d, t]]

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
        


        def findMatch(mbti_server, mbti_user):
            matches=[]
            for key in mbti_server:
                lst = mbti_server[key]
                if mbti_user[0][0] == lst[0][0]:
                    u = mbti_user[0][1] + lst[0][1]
                else:
                    u = 0;
                if mbti_user[1][0] == lst[1][0]:
                    x = mbti_user[1][1] + lst[1][1]
                else:
                    x = 0;
                if mbti_user[2][0] == lst[2][0]:
                    y = mbti_user[2][1] + lst[2][1]
                else:
                    y = 0;
                if mbti_user[3][0] == lst[3][0]:
                    z = mbti_user[3][1] + lst[3][1] 
                else:
                    z = 0;
    
                match_rate = u + x + y + z
                
                if match_rate >= 50:
                    result = {
                        1: lst[0][0],
                    2: lst[1][0],
                    3: lst[2][0],
                    4: lst[3][0],  
                    5: match_rate
                    }
                    
                    matches.append(result)

            if len(matches) > 0:
                return (jsonify(matches), 200, {'Content-Type': 'application/json'})
            else:
                return ("No matches found", 404)
	
	
        return findMatch(mbti_server, mbti_user)
    
            
    elif request.method == 'GET':
        return"It uses also GET request"
    
    #time complexity
    end = time.time()
    time_c = end - start
    print("Results found in: " + str(time_c) + "s") #time complexity
    return "Results found in: " + str(time_c) + "s"
        

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=False)
