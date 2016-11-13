var stocks = {
  'config': {
    'development': true
  },
  'source': 'stooq.pl'
};

stocks.load = function() {

  //console.log(this);

  $.ajax({
    url: 'http://127.0.0.1:8080/',
    crossDomain: true,
    context: this,
    dataType: 'html',
  }).done(function(data) {

    var domStructure = new DOMParser().parseFromString(data, 'text/html');
    var listOfFiles = domStructure.querySelectorAll('table tbody tr td:nth-child(3) a');

    //console.log($(this));
    listOfFiles.forEach(getContents, $(this));

  });
};

stocks.load();

function getContents(element, index, array) {

  var url = 'http://127.0.0.1:8080/' + element.innerHTML;

  //console.log(this);

  $.ajax({
    url: url,
    crossDomain: true,
    dataType: 'html',
    context: this,
  }).done(function(data) {
    this[0][element.innerHTML.slice(0, -4)] = $.csv.toArrays(data);
  });

  //console.log("Successfully parsed: " + url);

};

console.log(stocks);
