const myURL = new URL(
  "http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript"
);

// myURL.searchParams 대신 new URLSearchParams(myURL.search)로도 같은 결괏값을 얻을 수 있다.
console.log("searchParams:", myURL.searchParams); // searchParams: URLSearchParams { 'page' => '3', 'limit' => '10', 'category' => 'nodejs', 'category' => 'javascript' }
console.log("searchParams.getAll():", myURL.searchParams.getAll("category")); // searchParams.getAll(): [ 'nodejs', 'javascript' ]
console.log("searchParams.get():", myURL.searchParams.get("limit")); // searchParams.get(): 10
console.log("searchParams.has():", myURL.searchParams.has("page")); // searchParams.has(): true

console.log("searchParams.keys():", myURL.searchParams.keys()); // searchParams.keys(): [Object: null prototype] { '0' => 'page', '1' => 'limit', '2' => 'category', '3' => 'category' }
console.log("searchParams.values():", myURL.searchParams.values()); // searchParams.values(): [Object: null prototype] { '0' => '3', '1' => '10', '2' => 'nodejs', '3' => 'javascript' }

myURL.searchParams.append("filter", "es3");
myURL.searchParams.append("filter", "es5");
console.log(myURL.searchParams.getAll("filter")); // [ 'es3', 'es5' ]

myURL.searchParams.set("filter", "es6");
console.log(myURL.searchParams.getAll("filter")); // [ 'es6' ]

myURL.searchParams.delete("filter");
console.log(myURL.searchParams.getAll("filter")); // []

console.log("searchParams.toString():", myURL.searchParams.toString()); // searchParams.toString(): page=3&limit=10&category=nodejs&category=javascript
myURL.search = myURL.searchParams.toString();
