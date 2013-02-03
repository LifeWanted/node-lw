
var should  = require( 'should' );
var test    = require( '../' );
var lib     = test.lib;

var bindNth = lib.bindNth;

describe( 'bindNth', function(){

    it( 'should return a new function', function(){
        var called = false;
        function t(){
            called = true;
        };
        var bound = bindNth( t, 1, '' );

        should.exist( bound );
        bound.should.not.equal( t );
        called.should.be.false;

        bound();
        called.should.be.true;
    });

    it( 'should bind parameters to the given index', function(){
        bindNth( function( a, b, c, d ){
            a.should.equal( 1 );
            b.should.equal( 2 );
            c.should.equal( 3 );
            should.not.exist( d );
        }, 1, 1 )( 2, 3 );


        bindNth( function( a, b, c, d ){
            a.should.equal( 2 );
            b.should.equal( 1 );
            c.should.equal( 3 );
            should.not.exist( d );
        }, 2, 1 )( 2, 3 );

        bindNth( function( a, b, c, d ){
            a.should.equal( 2 );
            b.should.equal( 3 );
            c.should.equal( 1 );
            should.not.exist( d );
        }, 3, 1 )( 2, 3 );

        bindNth( function( a, b, c, d ){
            a.should.equal( 2 );
            b.should.equal( 3 );
            should.not.exist( c );
            d.should.equal( 1 );
        }, 4, 1 )( 2, 3 );
    });

    it( 'should bind all the parameters it is given', function(){
        bindNth( function( a, b, c, d, e ){
            a.should.equal( 1 );
            b.should.equal( 2 );
            c.should.equal( 3 );
            d.should.equal( 4 );
            should.not.exist( e );
        }, 1, 1, 2 )( 3, 4 );

        bindNth( function( a, b, c, d, e ){
            a.should.equal( 3 );
            b.should.equal( 1 );
            c.should.equal( 2 );
            d.should.equal( 4 );
            should.not.exist( e );
        }, 2, 1, 2 )( 3, 4 );

        bindNth( function( a, b, c, d, e ){
            a.should.equal( 3 );
            b.should.equal( 4 );
            should.not.exist( c );
            d.should.equal( 1 );
            e.should.equal( 2 );
        }, 4, 1, 2 )( 3, 4 );
    });

});
