/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');
var promisefs = Promise.promisify(fs.writeFile);
var promiseHelper1 = require('./promiseConstructor');
var promiseHelper2 = require('./promisification');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  //get firstline which is username
  return promiseHelper1.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(username) {
    //then request API
      return promiseHelper2.getGitHubProfileAsync(username);
    })
    .then(function(data) {
      console.log(JSON.stringify(data));
      //then write response
      return promisefs(writeFilePath, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }); 
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
