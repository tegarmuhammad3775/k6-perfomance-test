import { check, group } from "k6";
import http from "k6/http"
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


export let options = {
//Load test
//Targer 5 user, selama 5 detik
    stages : [
        {duration: '1s', target : 5},
        {duration: '5s', target : 5},
        {duration: '1s', target : 0},
    ],
}

export default function(){
    group("K6 Get Test", ()=>{
        let response1 = http.get('https://test.k6.io');
        check(response1, {
            'is status 200' : (r) => r.status == 200
        });
    });

    group("Reqres Create User", ()=>{
        let url = "https://reqres.in/api/users";
        let body = JSON.stringify(
          {
            "name": "morpheus2",
            "job": "leader2"
          }
        )
        let response2 = http.post(url,body)
        console.log(JSON.stringify(response2.body))
        check(response2, {
            'is status 201' : (r) => r.status == 201
        });
        
        group("Reqres Get Single User",()=>{
            let url = "https://reqres.in/api/users";
            let response3 = http.get(url);
            check(response3, {
                'is status 200' : (r) => r.status == 200
            });
        });

    });


};

export function handleSummary(data) {
    return {
      "script-result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
};

/**
 * ---Command for run more than 1 vu (virtual user)---
 * k6 run --vus 10 --duration 5s scri pt.js
 */