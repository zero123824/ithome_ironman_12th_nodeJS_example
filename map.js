import {Client} from "@googlemaps/google-maps-services-js";

const client = new Client({});

client.findPlaceFromText({
  params: {
    input:"台北101",
    language: "zh-tw"
  }
})
.then((r) => {
  console.log(r.data.results[0].text);
})
.catch((e) => {
  console.log(e.response.data.error_message);
})