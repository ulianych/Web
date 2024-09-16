function THashStorage()
{
    var self = this;
    var hashTable = {};

    self.Reset = function ()
    {
        hashTable = {};
    }

    self.AddValue = function (key, value) {
        hashTable[key] = value;
    }

    self.GetValue = function (key) {
        if (key in hashTable) {
            return hashTable[key];
        }
        else {
            alert("This airline isn't found :(");
            return null;
        }
    }

    self.RemoveValue = function(key) {
        if (key in hashTable) {
            delete hashTable[key];
        }
        else {
            alert("This airline isn't found :(");
        }
    }

    self.GetKeys = function() {
        let result = '';
        for (let key in hashTable) {
            result += key + ': ' + hashTable[key] + '\n';
        }
        return result;
    }
}

var Storage = new THashStorage();
Storage.Reset();

function addInformation() {
    var key = prompt("Enter the airline's name:");
    var value = prompt("Enter the review:");
    if (key == null || value == null) {
      console.log("Input data is empty. Try one more time.");
      return;
    }
    Storage.AddValue(key, value);
  }
  
  function deleteInformation() {
    var key = prompt("Enter the airline's name:");
    Storage.RemoveValue(key);
}
  
  function getInformation() {
    var key = prompt("Enter the airline's name:");
    var info = Storage.GetValue(key);
    if (info) {
        console.log("Review of " + key + ": " + info);
    }
  }
  
  function listAllInformation() {
    var allInfo = Storage.GetKeys();
    if (allInfo === "") {
      console.log("No information available.");
    } else {
      console.log(allInfo);
    }
  }