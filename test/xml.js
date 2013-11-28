var test = require('tape');
var trumpet = require('../');
var through = require('through');
var concat = require('concat-stream');
var fs = require('fs');
var expected = fs.readFileSync(__dirname + '/xml_expected.xml', 'utf8');

test('xml', function (t) {
    t.plan(1);
    var tr = trumpet();

    var els = [];
    var xml = tr.selectAll('*', function (node) {
        // els.push(node);
        console.error(node.name);
    });

    fs.createReadStream(__dirname + '/xml.xml')
        .pipe(tr)
        .pipe(concat(function (src) {
            // console.error(els);
            t.equal(src.toString('utf8'), expected);
        }))
    ;
});
