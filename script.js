import { check, group } from "k6";
import http from "k6/http"

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
        
    });


}