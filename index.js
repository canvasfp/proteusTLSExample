const Client = require("./client.js")

const fingerprint = "771,49195-49196-52393-49199-49200-52392-49171-49172-156-157-47-53,0-23-65281-10-11-35-16-5-13,29-23-24,0";

async function main(){
    console.log("Demo of the proteusTLS client for node.js");

    console.log("Let's try the default chrome tls fingerprint first.")

    var client = new Client({
        "type": "chrome",
    });

    
    let res = await client.request({
        url:"https://ja3er.com/json",
        method:"GET",
        headers:[
            ["user-agent", "Mozilla/5.0 (Nokia OS; 3310; x256) NokiaWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 NokiaBrowser/537.36"]
        ],
        parseJson:true
    });

    delete res.body["User-Agent"];
    
    console.log("ja3er.com responded:")
    console.log(res.body);


    console.log("Now reinit the client with a custom tls fingerprint.")
    console.log(`We will use ${fingerprint} which is the same fingerprint that okhttp has.`);

    client = new Client({
        "type": "custom",
        "ja3":fingerprint
    });

    res = await client.request({
        url:"https://ja3er.com/json",
        method:"GET",
        headers:[
            ["user-agent", "Mozilla/5.0 (Nokia OS; 3310; x256) NokiaWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 NokiaBrowser/537.36"]
        ],
        parseJson:true
    });

    delete res.body["User-Agent"];
    
    console.log("ja3er.com responded:")
    console.log(res.body);


    console.log("This time we will test the custom header order that can be set.");

    client = new Client({
        "type": "chrome",
    });
  
    res = await client.request({
        "url": "https://postman-echo.com/headers",
        "method": "GET",
        "headers": [
            ['first', 'header'],
            ['and', 'some'],
            ['more', 'headers'],
            ['that', 'are'],
            ['in', 'correct order']
        ],
        parseJson:true
    })

    let headers = res.body.headers;
    //Remove headers we didn't send
    delete headers["x-forwarded-proto"];
    delete headers["x-forwarded-port"];
    delete headers["host"];
    delete headers["x-amzn-trace-id"];

    console.log("using postman-echo.com to verify, we get the header order:")
    console.log(headers)

    console.log("For more information don't hesitate to contact me on discord: @franz#0666 or twitter: @canvasfp.")
}


main();
