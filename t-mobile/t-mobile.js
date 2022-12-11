import CryptoJS from 'crypto-js'

// var a = CryptoJS.enc.Utf8.parse("123")
// console.log(a);
// a= CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("123"));
// console.log(a);

/**
 * 创建密钥对
 * @returns
 */
const generateKeys = function () {
  return crypto.subtle.generateKey({
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: {
      name: "SHA-256"
    }
  }, !1, ["sign", "verify"]).then(function (e) {
    return {
      publicKey: e.publicKey,
      privateKey: e.privateKey
    }
  }, function (e) {
    throw console.error(e),
    e
  })
}


/**
 * 使用密钥对生成公钥
 */
generateKeys().then(function (e) {
  console.log("Added new keys")
  global.keyPair = e
  crypto.subtle.exportKey("spki", e.publicKey).then(function (e) {
    var n = btoa(String.fromCharCode.apply(null, new Uint8Array(e)))
    var pKey = "-----BEGIN PUBLIC KEY----- " + n + " -----END PUBLIC KEY-----"
    console.log(pKey)
    global.pKey = pKey
  })
})


const l = {
  stringify: function (e) {
    return btoa(String.fromCharCode.apply(0, e)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
  },
  parse: function (e) {
    return e = e.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, ""),
      new Uint8Array(Array.prototype.map.call(atob(e), function (e) {
        return e.charCodeAt(0)
      }))
  }
}

function getXAuthorization1(s) {
  let base64Str = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(s)))
  return l.stringify(l.parse(base64Str))

}

function getXAuthorization2(header, body) {
  var i = function () {
    var e = Math.pow(2, 32)
    return globalThis.crypto.getRandomValues(new Uint32Array(1))[0] / e
  }

  function r() {
    function e() {
      return Math.floor(65536 * (1 + i())).toString(16).substring(1)
    }
    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
  }

  // i.enc.Base64.stringify 算法
  var base64 = function (e) {
    var t = e.words
      , n = e.sigBytes
      , i = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    //e.clamp();
    for (var l = [], o = 0; o < n; o += 3)
      for (var r = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; a < 4 && o + .75 * a < n; a++)
        l.push(i.charAt(r >>> 6 * (3 - a) & 63))
    var s = '='
    if (s)
      for (; l.length % 4;)
        l.push(s)
    return l.join("")
  }

  var generateEhtsFormat = function (e, t, n, header, Authorization, s, u, c) {
    var d = new Map
      , p = 'tpp-product/v1/'
    d.set("Content-Type", "application/json"),
      Authorization && Authorization.length > 0 && e.url !== 'oauth2/v6/tokens' && (Authorization.startsWith("Bearer") ? d.set("Authorization", Authorization) : d.set("Authorization", "Bearer " + Authorization))
    e.url;
    (s && Object.keys(s).length > 0 && u,
      u = encodeURI(u.trim()),
      c && Object.keys(c).length > 0) && (u += this.generateQuerySuffix(c))
    var f = p.concat(u)
    d.set("uri", "/" + f),
      d.set("http-method", n),
      t && d.set("body", t),
      d.set("activityId", header.activityId),
      d.set("channelId", 'WEB'),
      d.set("interactionId", header.interactionId)
    //o.headers.get("channelid") && "nrd" === o.headers.get("channelid").toLowerCase() && this.stateStoreUtils.getApplicationUserId() && d.set("applicationUserId", this.stateStoreUtils.getApplicationUserId());
    var h = ""
      , m = ""
    d.forEach(function (e, t) {
      h.length > 0 && (h += ";"),
        h += t,
        m += e
    })
    // console.log("ehts", h),
    // console.log("edts", m)
    var g = r()
      , v = base64(CryptoJS.SHA256(m)).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "")  // CryptoJS.SHA256(m).toString(i.enc.Base64).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "")
      , y = 45 //sessionStorage.getItem("sessionCounter") 初始值是1，每一秒钟得加1

    // var b = 1669900457 + 45 //Number(sessionStorage.getItem("serverLoadTime")) + Number(y) serverLoadTime 网站初始化的实际，然后就固定了
    // var S = b + 120 // 过期时间
    //(this.appConfig.getConfig("tokenExp") ? this.appConfig.getConfig("tokenExp") : 120);

    var b = Number(Date.parse((new Date).toUTCString()) / 1e3)
    var S = b + 120


    return JSON.stringify({
      edts: v,
      v: "1",
      exp: S,
      ehts: h,
      iat: b,
      jti: g
    })
  }

  var e = {
    "domain": "esGatewayEndpoint",
    "name": "API_2170_getCompatibilityCheck",
    "proxyName": "product",
    "url": "devices/compatibility-check"
  }
  // var t = {
  //   "imei": "356908241999600",
  //   "compatibility": true
  // }

  var t = body

  var n = "POST"
  //   var header = {
  //     "activityId": "16707456326736043046000413597000",
  //     "applicationId": "REBELLION",
  //     "Authorization": "Bearer eyJraWQiOiI0NDY3MzUxNy04MTc4LTJjYTMtOWU3MC1mZTZiYjg4YjU2OTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJsUmFjY1MzbDZKSmE2bElpTElFQVBJZnJ4aXdTaU5pZSIsInJ0Ijoie1wic2VnbWVudGF0aW9uSWRcIjpcIlRJVEFOXCJ9IiwiZGVhbGVyQ29kZSI6IiIsImlzcyI6Imh0dHBzOlwvXC9hcGkudC1tb2JpbGUuY29tXC9vYXV0aDJcL3Y2IiwibWFzdGVyRGVhbGVyQ29kZSI6IiIsImF1dGhUaW1lIjoiMTY3MDc0NTUyNTYwNSIsInN0b3JlSWQiOiIiLCJ1c24iOiIwODViOTgxYy00ODc0LTc0NDktMjhmZC1jYzZmN2UyODliNDYiLCJhdWQiOiJsUmFjY1MzbDZKSmE2bElpTElFQVBJZnJ4aXdTaU5pZSIsInNlbmRlcklkIjoiIiwibmJmIjoxNjcwNzQ1NTI1LCJzY29wZSI6IiIsImNuZiI6Ii0tLS0tQkVHSU4gUFVCTElDIEtFWS0tLS0tIE1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBdUg0b0pmUmQ4NFhTNGpxdmxKQW92NEF6Wjl0WWtPQW4xcWJka09ROGk4bWtrcGpiR2pJQ3A1NWRsWkdjVzQySjB4d1hna3FYNmhZelRTVGUyMnc5WTFGNlM1V0pHcVwvMGVDdHN4Q3FwSytxQkFjTmZ5Q09EXC9SZm9qMGRqSDJrcVh5VTJsc1FNc21BRlNrTGp5XC9YTzRHR1MwYTBqR3BJalJwNFJNZlJYKzAydXVGVjhVRFFxUkZGOGREanBjWTk3THNWS01nZU9IWnJYNU92ZDgrNDZVMFFDRm1sRmJPSUJLcG50NlRIOTMwZkpMWlNQSUE3RmN5Vm5xTWZrbHorZzJGTGx1d0RLaEZCSXgrQXZUUFJ4cXdaYmNnRThFV1M5Zkk2ZkFUOHBqUGdiTjdNSFBlbGhBKzd2S1dhbnNkdm0yXC93V3RqNmM1OUswTmN3K25LTWRKUUlEQVFBQiAtLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0iLCJhcHBsaWNhdGlvbklkIjoiUkVCRUxMSU9OIiwiZXhwIjoxNjcwNzQ5MTI1LCJpYXQiOjE2NzA3NDU1MjUsImNoYW5uZWxJZCI6IiIsImp0aSI6IjA1ODUwOTYwLTYwYjEtYzJkNS0xYmI3LTA3ZGUwOWZiZWFmMCJ9.iifhtaTIW3KxjIyKMfe5S2r0Q7Sb4GJpC-YsyJ4s11R7KWncCh2YZ2z1zZlwOYfmOVCTLJloDjOoeEA3LMToZGwhyCW0ijU-1JSxnu31OdOVfM5xxRJmxkZrhQVOC8Rkb8hVsajBYmHuwqYbRN_2q4M8ixJx2awTIOhNk2B_fp_jJsnUSFcwzFhFE1w4odzSlrEZaW-TrI9tHSOX5Zn92FxL2kZaBFSbDRhVXp_JRLeVMZQeHI4vOk75IORNYh3XZbmEyTczpQeNGJ2_OJsz_2gKYuVsIrclLzF7AqR9_nPVoDiulddySkvsOn0SZH8IE1qeIuw77NveBQep8roGmA",
  //     "channelId": "WEB",
  //     "Content-type": "application/json",
  //     "interactionId": "WEBb692b6cc8869e78fcec48f721348505dANON62554",
  //     "Referer": "https://prepaid.t-mobile.com/",
  //     "screenId": "SC1135",
  //     "senderId": "TMO",
  //     "sessionId": "b692b6cc8869e78fcec48f721348505d",
  //     "stackId": "",
  //     "tl_referer": "https://prepaid.t-mobile.com/bring-your-own-device",
  //     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  //     "workflowId": "WF-SC-01.06",
  //     "x-authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5BIn0.eyJlZHRzIjoibUdLeHEwTWhVN0tKVlprZm10TjFza3J3VzhISzlUWVZEdFRrbGRRZUlCRSIsInYiOiIxIiwiZXhwIjoxNjcwNzQ2MDU4LCJlaHRzIjoiQ29udGVudC1UeXBlO0F1dGhvcml6YXRpb247dXJpO2h0dHAtbWV0aG9kO2JvZHk7YWN0aXZpdHlJZDtjaGFubmVsSWQ7aW50ZXJhY3Rpb25JZCIsImlhdCI6MTY3MDc0NTkzOCwianRpIjoiOTVkMzEzYjItZjVmOS0zZWVkLTViNDgtZjJiNDk5YmI5OTE5In0.Y9MQpPsHTfACB_GJfH6YYRnrwSGXLvjDyPOXi3Hj-QVLa8W-EWqX6JQ06F4vbRlWxGo43NiF7MczFolayifFUb12gnI-F7HQ-3QZVOdMw8qk8Uo92I4xO7ockWK13bP4xWXl7OBn44IbxLKiblpQpCPmneEk9DqzCZujc4YT1Sm9cIOJAFR0gofTk3CGFskLFFRz1eag8NEApXXSLlNdS_g7imclqxGJGuJbNOxWCl3MTiAwt0QwAodso8rbZc7msUtJ4wnBSpwF5HF8tPB6J39rgWz96AyrzGbRCNwW7f7cQNRFN3PkIbel_o7TbJxk3HB6Br101c2di0M-La1-CQ"
  // }

  var a = header.Authorization
  var s = null
  var u = "devices/compatibility-check"
  var c = null

  var xAEndTemp = generateEhtsFormat(e, t, n, header, a, s, u, c)
  // console.log(xAEndTemp)
  // '{"edts":"c8AuyNX-YtOoxQLeWQlzwKFinMNPbCD0MGuxFcGj_Lk","v":"1","ehts":"Content-Type;Authorization;uri;http-method;body;activityId;channelId;interactionId","iat":1669900502,"jti":"5185db5b-1f9c-e925-68e3-2fc521d45bfa"}'
  let base64Str = btoa(xAEndTemp)

  return l.stringify(l.parse(base64Str))
}


async function getXAuthorization3(token) {
  // 密钥不对
  // let keyPair = await crypto.subtle.generateKey({
  //   name: "RSASSA-PKCS1-v1_5",
  //   modulusLength: 2048,
  //   publicExponent: new Uint8Array([1, 0, 1]),
  //   hash: {
  //     name: "SHA-256"
  //   }
  // }, !1, ["sign", "verify"]).then(function (e) {
  //   return {
  //     publicKey: e.publicKey,
  //     privateKey: e.privateKey
  //   }
  // }, function (e) {
  //   throw console.error(e),
  //   e
  // })


  let base64Str = btoa(token)
  let value = l.parse(base64Str)

  const sig = await crypto.subtle.sign({
    name: "RSASSA-PKCS1-v1_5",
    hash: {
      name: "SHA-256"
    }
  }, global.keyPair.privateKey, value)

  return l.stringify(new Uint8Array(sig))
}


// *********** main **************

// var s = {
//   alg: 'RS256',
//   typ: 'JWT',
//   kid: 'NA'
// }

// let xAuthorization1 = getXAuthorization1(s)
// console.log('xAuthorization1', xAuthorization1, "\n")

// var header = {
//   "activityId": "16707613481104628487427253276000",
//   "Authorization": "Bearer eyJraWQiOiI0NDY3MzUxNy04MTc4LTJjYTMtOWU3MC1mZTZiYjg4YjU2OTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJsUmFjY1MzbDZKSmE2bElpTElFQVBJZnJ4aXdTaU5pZSIsInJ0Ijoie1wic2VnbWVudGF0aW9uSWRcIjpcIlBPTEFSSVNcIn0iLCJkZWFsZXJDb2RlIjoiIiwiaXNzIjoiaHR0cHM6XC9cL2FwaS50LW1vYmlsZS5jb21cL29hdXRoMlwvdjYiLCJtYXN0ZXJEZWFsZXJDb2RlIjoiIiwiYXV0aFRpbWUiOiIxNjcwNzYxMzQ4MDQwIiwic3RvcmVJZCI6IiIsInVzbiI6IjVmMGNiMmYzLTQxZTItMTA4ZS1jYzNkLWQ3YjE2ZmE2MjY4YSIsImF1ZCI6ImxSYWNjUzNsNkpKYTZsSWlMSUVBUElmcnhpd1NpTmllIiwic2VuZGVySWQiOiIiLCJuYmYiOjE2NzA3NjEzNDgsInNjb3BlIjoiIiwiY25mIjoiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0gTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF1SDRvSmZSZDg0WFM0anF2bEpBb3Y0QXpaOXRZa09BbjFxYmRrT1E4aThta2twamJHaklDcDU1ZGxaR2NXNDJKMHh3WGdrcVg2aFl6VFNUZTIydzlZMUY2UzVXSkdxXC8wZUN0c3hDcXBLK3FCQWNOZnlDT0RcL1Jmb2owZGpIMmtxWHlVMmxzUU1zbUFGU2tManlcL1hPNEdHUzBhMGpHcElqUnA0Uk1mUlgrMDJ1dUZWOFVEUXFSRkY4ZERqcGNZOTdMc1ZLTWdlT0haclg1T3ZkOCs0NlUwUUNGbWxGYk9JQktwbnQ2VEg5MzBmSkxaU1BJQTdGY3lWbnFNZmtseitnMkZMbHV3REtoRkJJeCtBdlRQUnhxd1piY2dFOEVXUzlmSTZmQVQ4cGpQZ2JON01IUGVsaEErN3ZLV2Fuc2R2bTJcL3dXdGo2YzU5SzBOY3crbktNZEpRSURBUUFCIC0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLSIsImFwcGxpY2F0aW9uSWQiOiJSRUJFTExJT04iLCJleHAiOjE2NzA3NjQ5NDgsImlhdCI6MTY3MDc2MTM0OCwiY2hhbm5lbElkIjoiIiwianRpIjoiMmEwZWRjNTYtOGZiZS0wZjNiLTk3ZjktY2Q4ZTgzNzlhOWFiIn0.g9IyEltEYHIbRn9S6cOEhbbEopklLnjsH9dL-xePmitDwbwXPtSeFYPND0Eg-TaRMkqDzmrM98FjKmZPFK0x3UU4tbyZ2LeyNxStbQ45cVP9273yh2OtcDtUbKgbm-mIcZwOvtVrmJyHayLYZ4RFOsBkhrbMTrMR-O1N5EczOT8KlJw9Ws_TVjsvkhf6en9Qe2bD20dIKLgBcgvxfQuMdMkmCJKNLg5U_12A8Q5iHth8phwhi0MWHQK58jbB29cIhlBC9ReVSx9xH1MLhB9VEK7WaqBmRJCi8LFHMsU-W53JAtINBkU-QGfO1OwG5Nf1hIcWz_eCQxBm_PXLb5XRPQ",
//   "interactionId": "WEBf6ffe06c6a84e0a67e648dbb87f60d54ANON73477",
//   "sessionId": "f6ffe06c6a84e0a67e648dbb87f60d54"
// }
// var body = {
//   "imei": "351123623462087",
//   "compatibility": true
// }
// let xAuthorization2 = getXAuthorization2(header, JSON.stringify(body))
// console.log('xAuthorization2', xAuthorization2, "\n")

// let token = xAuthorization1 + "." + xAuthorization2

// console.log("token", token, "\n")

// let xAuthorization3 = await getXAuthorization3(token)
// console.log('xAuthorization3', xAuthorization3, "\n")


// let xAuthorization = token + "." + xAuthorization3

// console.log("xAuthorization", xAuthorization, "\n")

// -----------------------------
// 搭建服务

// import http from "http"


// const hostname = 'localhost'
// const port = 7788

// const server = http.createServer(async (req, res) => {
//   var data
//   var result
//   if (req.method === 'POST') {
//     // 定义一个变量来保存请求主体的数据
//     let body = ''

//     // 当有数据接收到时，将数据拼接到 body 中
//     req.on('data', chunk => {
//       body += chunk.toString()
//     })

//     // 当所有数据接收完成时，将 body 中的数据解析为对象
//     req.on('end', () => {
//       if (body.length > 0) {
//         data = JSON.parse(body)
//         console.log(data)
//       }
//     })
//   }

//   console.log(req.url)
//   console.log("data", data)

//   if (req.url === '/pubkey') {
//     result = global.pKey
//   } else if (req.url == '/xAuthorization') {
//     console.log("data", data)

//     let header = data.header
//     let body = data.body
//     var s = {
//       alg: 'RS256',
//       typ: 'JWT',
//       kid: 'NA'
//     }
//     let xAuthorization1 = getXAuthorization1(s)
//     console.log('xAuthorization1', xAuthorization1, "\n")

//     let xAuthorization2 = getXAuthorization2(header, JSON.stringify(body))
//     console.log('xAuthorization2', xAuthorization2, "\n")

//     let token = xAuthorization1 + "." + xAuthorization2
//     console.log("token", token, "\n")

//     let xAuthorization3 = await getXAuthorization3(token)
//     console.log('xAuthorization3', xAuthorization3, "\n")

//     let xAuthorization = token + "." + xAuthorization3

//     console.log("xAuthorization", xAuthorization, "\n")
//     result = xAuthorization
//   }

//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end(result)
// })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })

// *****************

import express from "express"
import bodyParser from 'body-parser'


var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//设置接口 返回值
app.post('/pubkey', function (req, res) {
  res.send(global.pKey)
})
//设置接口 返回值
app.post('/xAuthorization', async function (req, res) {
  console.log(req.body.header)
  console.log(req.body.body)
  let header = req.body.header
  let body = req.body.body
  var s = {
    alg: 'RS256',
    typ: 'JWT',
    kid: 'NA'
  }
  let xAuthorization1 = getXAuthorization1(s)
  console.log('xAuthorization1', xAuthorization1, "\n")

  let xAuthorization2 = getXAuthorization2(header, JSON.stringify(body))
  console.log('xAuthorization2', xAuthorization2, "\n")

  let token = xAuthorization1 + "." + xAuthorization2
  console.log("token", token, "\n")

  let xAuthorization3 = await getXAuthorization3(token)
  console.log('xAuthorization3', xAuthorization3, "\n")

  let xAuthorization = token + "." + xAuthorization3

  console.log("xAuthorization", xAuthorization, "\n")
  res.send(xAuthorization)
})

var server = app.listen(7788, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(`Server running at http://${host}:${port}/`)
})


