import CryptoJS from 'crypto-js'

// var a = CryptoJS.enc.Utf8.parse("123")
// console.log(a);
// a= CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("123"));
// console.log(a);

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

function getXAuthorization2() {
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

  var generateEhtsFormat = function (e, t, n, o, a, s, u, c) {
    var d = new Map
      , p = 'tpp-product/v1/'
    d.set("Content-Type", "application/json"),
      a && a.length > 0 && e.url !== 'oauth2/v6/tokens' && (a.startsWith("Bearer") ? d.set("Authorization", a) : d.set("Authorization", "Bearer " + a))
    e.url;
    (s && Object.keys(s).length > 0 && u,
      u = encodeURI(u.trim()),
      c && Object.keys(c).length > 0) && (u += this.generateQuerySuffix(c))
    var f = p.concat(u)
    d.set("uri", "/" + f),
      d.set("http-method", n),
      t && d.set("body", t),
      d.set("activityId", '16699006043552071691034361720000'),
      d.set("channelId", 'WEB'),
      d.set("interactionId", 'WEB3b7f041afa8628e4b87319d482fd31a7ANON95400')
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
      , y = 45 //sessionStorage.getItem("sessionCounter")
      , b = 1669900457 + 45 //Number(sessionStorage.getItem("serverLoadTime")) + Number(y)
      , S = b + 120
    //(this.appConfig.getConfig("tokenExp") ? this.appConfig.getConfig("tokenExp") : 120);
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
  var t = {
    "imei": "356908241999600",
    "compatibility": true
  }

  var n = "POST"
  var header = {
    "headers": {
      "Content-type": [
        "application/json"
      ],
      "senderId": [
        "TMO"
      ],
      "applicationId": [
        "REBELLION"
      ],
      "tl_referer": [
        "https://prepaid.t-mobile.com/bring-your-own-device"
      ],
      "channelId": [
        "WEB"
      ],
      "activityId": [
        "16702582010961987594291567802400"
      ],
      "stackId": [
        ""
      ],
      "interactionId": [
        "WEBef4d9de3b4f09c2fd21efe52e2cddf3dANON83185"
      ],
      "Authorization": [
        "Bearer eyJraWQiOiI0NDY3MzUxNy04MTc4LTJjYTMtOWU3MC1mZTZiYjg4YjU2OTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJsUmFjY1MzbDZKSmE2bElpTElFQVBJZnJ4aXdTaU5pZSIsInJ0Ijoie1wic2VnbWVudGF0aW9uSWRcIjpcIlBPTEFSSVNcIn0iLCJkZWFsZXJDb2RlIjoiIiwiaXNzIjoiaHR0cHM6XC9cL2FwaS50LW1vYmlsZS5jb21cL29hdXRoMlwvdjYiLCJtYXN0ZXJEZWFsZXJDb2RlIjoiIiwiYXV0aFRpbWUiOiIxNjcwMjU4MTM3ODY0Iiwic3RvcmVJZCI6IiIsInVzbiI6Ijk1OTA0YzkwLTVmZmQtYzlhNi0yMDA1LTllOTAxYjRmMzhlYiIsImF1ZCI6ImxSYWNjUzNsNkpKYTZsSWlMSUVBUElmcnhpd1NpTmllIiwic2VuZGVySWQiOiIiLCJuYmYiOjE2NzAyNTgxMzcsInNjb3BlIjoiIiwiY25mIjoiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0gTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF1SDRvSmZSZDg0WFM0anF2bEpBb3Y0QXpaOXRZa09BbjFxYmRrT1E4aThta2twamJHaklDcDU1ZGxaR2NXNDJKMHh3WGdrcVg2aFl6VFNUZTIydzlZMUY2UzVXSkdxXC8wZUN0c3hDcXBLK3FCQWNOZnlDT0RcL1Jmb2owZGpIMmtxWHlVMmxzUU1zbUFGU2tManlcL1hPNEdHUzBhMGpHcElqUnA0Uk1mUlgrMDJ1dUZWOFVEUXFSRkY4ZERqcGNZOTdMc1ZLTWdlT0haclg1T3ZkOCs0NlUwUUNGbWxGYk9JQktwbnQ2VEg5MzBmSkxaU1BJQTdGY3lWbnFNZmtseitnMkZMbHV3REtoRkJJeCtBdlRQUnhxd1piY2dFOEVXUzlmSTZmQVQ4cGpQZ2JON01IUGVsaEErN3ZLV2Fuc2R2bTJcL3dXdGo2YzU5SzBOY3crbktNZEpRSURBUUFCIC0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLSIsImFwcGxpY2F0aW9uSWQiOiJSRUJFTExJT04iLCJleHAiOjE2NzAyNjE3MzcsImlhdCI6MTY3MDI1ODEzNywiY2hhbm5lbElkIjoiIiwianRpIjoiMTIwZjkyYjktZmRmNy0zNGFkLWUwNWEtODZiZTY5MGJmMTg1In0.0Aqt0xN9din0yuwoZHGRaHhybm9ftlXQe3jB3p1Z8M2f0Rj1zmTilxY4BTeIf-9xcu7vpw5HUM9AtgtYAoWlAsZBDEzHiH0omv_i4ucueOdoaL5UpT5ICpWQtTXszXf01qYRnIJS-7uOdlpilj80ZO5GN_u6MrEugIhtbfK7tGNG-Hwp3neSy7CyNr6gXgsE7JUCxqIMaRVPI50y20dYYLUdN1wiBnnk9ha6E8ZtuXsamYAuBntD3t0mATps2dCTRCZq9feYU3KXPZ3XoQrvW5b5vGWsmi3RjeV1y7fVi2dTqwfx78Hy4A2d2JARvnq9Jho5gxw1sBFf0f8CBvR2JA"
      ],
      "sessionId": [
        "ef4d9de3b4f09c2fd21efe52e2cddf3d"
      ],
      "workflowId": [
        "WF-SC-01.06"
      ],
      "screenId": [
        "SC1135"
      ]
    }
  }

  var a = "eyJraWQiOiI0NDY3MzUxNy04MTc4LTJjYTMtOWU3MC1mZTZiYjg4YjU2OTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJsUmFjY1MzbDZKSmE2bElpTElFQVBJZnJ4aXdTaU5pZSIsInJ0Ijoie1wic2VnbWVudGF0aW9uSWRcIjpcIlBPTEFSSVNcIn0iLCJkZWFsZXJDb2RlIjoiIiwiaXNzIjoiaHR0cHM6XC9cL2FwaS50LW1vYmlsZS5jb21cL29hdXRoMlwvdjYiLCJtYXN0ZXJEZWFsZXJDb2RlIjoiIiwiYXV0aFRpbWUiOiIxNjY5OTAwNDU5MDkyIiwic3RvcmVJZCI6IiIsInVzbiI6IjA4ZWUyNGNlLTE0ZmYtOTcyNC1kMDA3LTcxOTU4YTZmNDk4NCIsImF1ZCI6ImxSYWNjUzNsNkpKYTZsSWlMSUVBUElmcnhpd1NpTmllIiwic2VuZGVySWQiOiIiLCJuYmYiOjE2Njk5MDA0NTksInNjb3BlIjoiIiwiY25mIjoiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0gTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF1SDRvSmZSZDg0WFM0anF2bEpBb3Y0QXpaOXRZa09BbjFxYmRrT1E4aThta2twamJHaklDcDU1ZGxaR2NXNDJKMHh3WGdrcVg2aFl6VFNUZTIydzlZMUY2UzVXSkdxXC8wZUN0c3hDcXBLK3FCQWNOZnlDT0RcL1Jmb2owZGpIMmtxWHlVMmxzUU1zbUFGU2tManlcL1hPNEdHUzBhMGpHcElqUnA0Uk1mUlgrMDJ1dUZWOFVEUXFSRkY4ZERqcGNZOTdMc1ZLTWdlT0haclg1T3ZkOCs0NlUwUUNGbWxGYk9JQktwbnQ2VEg5MzBmSkxaU1BJQTdGY3lWbnFNZmtseitnMkZMbHV3REtoRkJJeCtBdlRQUnhxd1piY2dFOEVXUzlmSTZmQVQ4cGpQZ2JON01IUGVsaEErN3ZLV2Fuc2R2bTJcL3dXdGo2YzU5SzBOY3crbktNZEpRSURBUUFCIC0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLSIsImFwcGxpY2F0aW9uSWQiOiJSRUJFTExJT04iLCJleHAiOjE2Njk5MDQwNTksImlhdCI6MTY2OTkwMDQ1OSwiY2hhbm5lbElkIjoiIiwianRpIjoiZmM0MTFiNzYtMGFjZi03OGQ1LTMyMTEtZTVhYmE1ZWU1ZWY0In0.QraxvH8QZBxOta__yCmclHm6wSTIUpTJlKefjSyxjMRr3ZadLM2byJUvOLVgc49B5Mt7lSXQucYgT4ks59qbRRwC27Mi7QxBMjNBkkC1zTJ6xqqDMNxlKJEQfMi4guFBQgz3rp8s6neH3Z373aHqBKE890owYl3OG-4TU2aMkA61br8-uWOZkrnkFSa-LYy3_kpa5f9YAK-4-xi-rc_V0okZGHOYkOqWWxOT0e3XyCeyeDUfrLd4_RKa8RMNJJS6iHhIizTwMQ2ShvMsmfd4Nd5XvnYUyM1H94QwCzULVIR8EhtTqxLH3m6TYjKWksgJY5XTFiM4jCo01s4CUufe5A"
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
  let keyPair = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    false, // 是否可提取，比如用于导入导出
    ["sign"]
  )


  let base64Str = btoa(token)
  // console.log(base64Str);

  const sig = await crypto.subtle.sign({
    name: "RSASSA-PKCS1-v1_5",
    hash: {
      name: "SHA-256"
    }
  }, keyPair.privateKey, l.parse(base64Str))

  // console.log(sig);

  return l.stringify(new Uint8Array(sig))
}


// *********** main **************

var s = {
  alg: 'RS256',
  typ: 'JWT',
  kid: 'NA'
}

let xAuthorization1 = getXAuthorization1(s)
console.log('xAuthorization1', xAuthorization1, "\n")


let xAuthorization2 = getXAuthorization2()
console.log('xAuthorization2', xAuthorization2, "\n")

let token = xAuthorization1 + "." + xAuthorization2

token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5BIn0.eyJlZHRzIjoiamxtclA3b3NyVzh3eC1YbFlTTmNxSUg1aXJrMWJ4UVZvTGtLTVdXTFBtRSIsInYiOiIxIiwiZXhwIjoxNjcwMjkzNjYwLCJlaHRzIjoiQ29udGVudC1UeXBlO0F1dGhvcml6YXRpb247dXJpO2h0dHAtbWV0aG9kO2JvZHk7YWN0aXZpdHlJZDtjaGFubmVsSWQ7aW50ZXJhY3Rpb25JZCIsImlhdCI6MTY3MDI5MzU0MCwianRpIjoiZDk4N2RjOTYtZWRlNC01NTc3LWIzYjgtOTZhMzUyOThmNDI1In0'

let xAuthorization3 = await getXAuthorization3(token)
console.log('xAuthorization3', xAuthorization3, "\n")


let xAuthorization = token + "." + xAuthorization3

console.log("xAuthorization", xAuthorization, "\n")


