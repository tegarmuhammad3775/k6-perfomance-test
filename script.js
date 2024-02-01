import http from "k6/http"

export default function(){
    let response1 = http.get('https://test.k6.io');

    let url = "https://reqres.in/api/users";
    let body = JSON.stringify(
      {
        "name": "morpheus",
        "job": "leader"
      }
    )
    let response2 = http.post(url,body)
    console.log(JSON.stringify(response2.body))
}