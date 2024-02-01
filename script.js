import http from "k6/http"

export default function(){
    http.get('https://test.k6.io');

    let url = "https://reqres.in/api/users";
    let body = JSON.stringify(
      {
        "name": "morpheus",
        "job": "leader"
      }
    )
    http.post(url,body)
}