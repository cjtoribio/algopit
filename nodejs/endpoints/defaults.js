var _ = require('lodash');

exports.up = function(ws, model){
    ws.get('*', function(req, res) {
        console.log(req.originalUrl);
      res.redirect('/#' + req.originalUrl);
    });
    
    ws.use(function(err, req, res, next) {
      console.error(err.stack);
      res.send(500, { message: err.message });
    });
    
    console.log("Defaults Service Started");
};