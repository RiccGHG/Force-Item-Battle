const check = /(\d+)h(rs)? (\d+)m(in|s)? (\d+)s/
const m1 = "1h 5min 1s".match(check)
const m2 = "1h 5m 1s".match(check)
console.log("1: " + m1[4] + "\n" + "2: " + m2[3]);


