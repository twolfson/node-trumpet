var test = require('tape');
var trumpet = require('../');
var through = require('through');
var concat = require('concat-stream');
var fs = require('fs');
var expected = fs.readFileSync(__dirname + '/loud_expected.html', 'utf8');

console.log('hai');

test('xml', function (t) {
    t.plan(1);
    var tr = trumpet();

    var xml = tr.select('.load').createStream();
    xml.pipe(through(function (buf) {
        this.queue(buf.toString().toUpperCase());
    })).pipe(xml);

    console.log('hai');

    fs.createReadStream(__dirname + '/loud.html')
        .pipe(tr)
        .pipe(concat(function (src) {
            console.log(src.toString());
            t.equal(src.toString('utf8'), expected);
        }))
    ;
});
