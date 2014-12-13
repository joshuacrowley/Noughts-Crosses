process.env.MAIL_URL="smtp://meteor.crossword%40gmail.com:noughtswinsforever@smtp.gmail.com:465/";

 Games.allow({
    'update': function (userId, doc, fields, modifier) {
      return true; 
    },

    insert: function (userId, doc) {
   	return true; 
  }
  });

  Boxes.allow({
    'update': function (userId, doc, fields, modifier) {
      return true; 
    },

    insert: function (userId, doc) {
   	return true; 
  }
  });