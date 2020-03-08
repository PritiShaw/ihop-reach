var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
  m,
  key,
  value
) {
  vars[key] = value;
});

var url = document.URL;
console.log("D: " + url + " V: " + JSON.stringify(vars));

var text = vars.text;

// Fix HTML entities
text = text.replace(/[+]/g, " ");
text = decodeURIComponent(text);

// Escape regexp
var regexpStr = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Correct science specific elements
regexpStr = regexpStr.replace(/alpha|beta|gamma|delta|epsilon/g, ".*");
//regexpStr = regexpStr.replace(/-/g, '.*');
regexpStr = regexpStr.replace(".*.*", ".*");
//regexpStr = regexpStr.replace(/ /g, '.*');
console.log("NCBI: 3 " + regexpStr);

var regexp = new RegExp("\\b" + regexpStr + "\\b", "gi");

try {
  // From: https://jsfiddle.net/julmot/vpav6tL1/
  $("#maincontent").markRegExp(regexp);
  $(window).scrollTop($("mark").offset().top - 100);
} catch (e1) {
  console.log(e1);
  try {
    window.find(text);
  } catch (e2) {
    console.log(e2);
  }
}
