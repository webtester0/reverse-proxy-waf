# Reverse proxy web application firewall prototype

`waf.js` is a reverse proxy web application firewall (WAF).

This WAF is built by using Node.js. Technically the WAF connects to the destination server by providing IP and Port of destination.

The WAF intercepts the incoming traffic,detects and prevent XSS.

It's main goals are to demonstrate well known application security methods and algorithms implemented on a server-side of web application.

`waf.js` it's just a prototype and must not be used in production.

## Description

### Features 

Detect and block the most popular server-side web attack such as reflected and stored XSS.

Set X-XSS-Protection header to 1 for browser protection.

### Enviroment
It's a prototype of WAF and mock of vulnerable web server. 

Web server is a XSS vulnerable server built by using Node.js and Express.
The user can attack the server with Reflected and Stored XSS. This server uses mongo DB to store user data.

So you can test the efficiency and perfomance of working this WAF.

In directory reverse_proxy_waf you can find the sanityTest.js and run it by using this command 
`casperjs test sanityTest.js`.

![](https://i.paste.pics/48e4336fa23b73d91d8871ec217c84fc.png)

## Installation

```
git clone https://github.com/webtester0/reverse-proxy-waf.git
cd reverse_proxy_waf/
npm i
node waf.js (waf will run on 3001 port)
cd mock_server/
npm i
cd bin 
node www (vulnerable web server will run on 3000 port)
```

