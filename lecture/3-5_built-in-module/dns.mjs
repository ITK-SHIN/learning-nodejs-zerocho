import dns from "dns/promises";

const ip = await dns.lookup("gilbut.co.kr"); // 도메인 조회
console.log("IP", ip); // IP

const a = await dns.resolve("gilbut.co.kr", "A"); // A 레코드 조회
console.log("A", a); // A

const mx = await dns.resolve("gilbut.co.kr", "MX"); // MX 레코드 조회
console.log("MX", mx); // MX

const cname = await dns.resolve("www.gilbut.co.kr", "CNAME"); // CNAME 레코드 조회
console.log("CNAME", cname);

const any = await dns.resolve("gilbut.co.kr", "ANY"); // ANY 레코드 조회
console.log("ANY", any);

/* 
IP { address: '49.236.151.220', family: 4 }
A [ '49.236.151.220' ]
MX [
  { exchange: 'aspmx3.googlemail.com', priority: 10 },
  { exchange: 'alt2.aspmx.l.google.com', priority: 5 },
  { exchange: 'alt1.aspmx.l.google.com', priority: 5 },
  { exchange: 'aspmx.l.google.com', priority: 1 },
  { exchange: 'aspmx2.googlemail.com', priority: 10 }
]
CNAME [ 'slb-1088813.ncloudslb.com' ]
ANY [
  { value: 'ns1-2.ns-ncloud.com', type: 'NS' },
  { value: 'ns1-1.ns-ncloud.com', type: 'NS' },
  {
    nsname: 'ns1-1.ns-ncloud.com',
    hostmaster: 'ns1-2.ns-ncloud.com',
    serial: 108,
    refresh: 21600,
    retry: 1800,
    expire: 1209600,
    minttl: 300,
    type: 'SOA'
  }
]

*/
