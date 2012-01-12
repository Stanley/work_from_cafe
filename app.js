var couchapp = require('couchapp')
  , path = require('path')

ddoc = {
  _id: '_design/app',
  views: {},
  shows: {},
  lists: {}
}

module.exports = ddoc

// GET /cafe/_design/app/_design/by_city
ddoc.views.by_city = {
  map: function(doc){
    emit([doc.city], doc)
  }
}

// GET /cafe/_design/app/_show/cafe/<id>
ddoc.shows.cafe = function(doc,req){
  return {
    headers: {'Content-type': 'text/html'},
    body: '<h1>'+ doc.name +'</h1>'
  }
}

// GET /cafe/_design/app/_list/cafes/by_city
ddoc.lists.cafes = function(head,req){
  while (cafe = getRow()){
    send('<li>'+ cafe.value.name +'</li>')
  }
}

couchapp.loadAttachments(ddoc, path.join(__dirname, '_attachments'))
