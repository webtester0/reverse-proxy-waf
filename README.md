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
cd mock_server/
npm i
```

## Usage 

To start reverse-proxy-waf use commands below and it will run on http://localhost:3001:

```
cd reverse_proxy_waf/
node waf.js 
```

To start vulnerable web server use commands below and express server will run on http://localhost:3000:

```
cd mock_server/
cd bin/
node www
```

## Examples

### Reflected XSS

In browser URL bar:

![](https://i.paste.pics/0319a9f7d6acc030986c908fc0688834.png)

Reflected XSS detected by WAF:

![](https://i.paste.pics/fb88ee242e110f7b916c12d4483bcaff.png)

### Stored XSS

Execution a persistent XSS by injecting a script inside request body.

![](https://i.paste.pics/cb25882919e4f2f616a319653355dc06.png)

Stored XSS detected by WAF:

![](https://i.paste.pics/16c9b6512441ab885a53c585d44ee6de.png)

