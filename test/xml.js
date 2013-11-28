var test = require('tape');
var trumpet = require('../');
var through = require('through');
var concat = require('concat-stream');
var fs = require('fs');
var expected = fs.readFileSync(__dirname + '/xml_expected.html', 'utf8');

test('xml', function (t) {
    t.plan(1);
    var tr = trumpet();

    // var xml = tr.select('*').createStream();
    // xml.pipe(through(function (buf) {
    //     this.queue(buf.toString().toUpperCase());
    // })).pipe(xml);

    fs.createReadStream(__dirname + '/xml.html')
        .pipe(tr)
        .pipe(concat(function (src) {
            t.equal(src.toString('utf8'), expected);
        }))
    ;
});
