var fs = require('fs')
var metadata_config = require("../cryptoitem-metadata-server/package.json").config;

console.log("=======================")
console.log("Updating contract info based on metadata server...")
console.log("=======================")

console.log("Reading contract template...");
fs.readFile("contract-templates/Cryptoitem.template.sol", 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  for (element in metadata_config) {
    var value = metadata_config[element];
    var data = data.replace(new RegExp(element, 'g'), value);

  }
  
  console.log("Writing new contract file...")

  fs.writeFile("contracts/Cryptoitem.sol", data, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
console.log("Done.")

console.log("=======================")
console.log("Deploying contract...")
console.log("=======================")
