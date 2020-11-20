let debug = require('debug')('my-application');
let app = require('../app');

app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get("port"));
});
