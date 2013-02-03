
var should  = require( 'should' );
var test    = require( '../' );
var lib     = test.lib;

var Time = lib.time.Time;

describe( 'Time', function(){
    describe( '#constructor', function(){
        it( 'should act as a type-caster when used with numbers', function(){
            var time = Time( 1 );
            should.exist( time );
            time.should.be.an.instanceOf( Time );
            time.toMilliseconds().should.equal( 1 );
        });

        it( 'should act as a type-caster when used with Date objects', function(){
            var time = Time( new Date( 5 ) );
            should.exist( time );
            time.should.be.an.instanceOf( Time );
            time.toMilliseconds().should.equal( 5 );
        });
    });

    describe( '#add', function(){
        it( 'should add milliseconds to the time object', function(){
            var time = Time( 10 );
            time.add( 5 );
            time.toMilliseconds().should.equal( 15 );
        });

        it( 'should return itself', function(){
            var time        = Time( 15 );
            var addResult   = time.add( 5 );
            should.exist( addResult );
            addResult
                .should.be.an.instanceOf( Time )
                .and.equal( time );
        });
    });

    describe( '#diff', function(){
        it( 'should return a new Time object', function(){
            var time = Time( 10 );
            var diff = time.diff( 5 );
            should.exist( diff );
            diff
                .should.be.an.instanceOf( Time )
                .and.not.equal( time );
        });

        it( 'should calculate the difference in milliseconds', function(){
            var time = Time( 10 ).diff( 5 );
            time.toMilliseconds().should.equal( -5 );
        });
    });

    describe( '#diffFromNow', function(){
        it( 'should return a new Time object', function(){
            var time = Time( 10 );
            var diff = time.diffFromNow();
            should.exist( diff );
            diff
                .should.be.an.instanceOf( Time )
                .and.not.equal( time );
        });

        it( 'should calculate the difference between it and now in milliseconds', function(){
            var time = Time( 10 ).diffFromNow();
            time.toMilliseconds().should.be.above( 0 );

            time = lib.time.now().add( 10 ).diffFromNow();
            time.toMilliseconds().should.be.below( 0 );
        });
    });

    describe( '#fromUnixEpoch', function(){
        it( 'should return itself', function(){
            var time    = Time( 10 );
            var res     = time.fromUnixEpoch();
            should.exist( res );
            res
                .should.be.an.instanceOf( Time )
                .and.equal( time );
        });

        it( 'should set itself as a fixed time point', function(){
            Time( 10 ).fromUnixEpoch()._isTimePoint.should.be.true;
        });
    });

    describe( '#isInFuture', function(){
        it( 'should be true if the time is greater than now', function(){
            Time( new Date() ).add( 20 ).isInFuture().should.be.true;
        });

        it( 'should be false if the time is less than now', function(){
            Time( new Date() ).subtract( 20 ).isInFuture().should.be.false;
        });
    });

    describe( '#isInPast', function(){
        it( 'should be false if the time is greater than now', function(){
            Time( new Date() ).add( 20 ).isInPast().should.be.false;
        });

        it( 'should be true if the time is less than now', function(){
            Time( new Date() ).subtract( 20 ).isInPast().should.be.true;
        });
    });

    describe( '#subtract', function(){
        it( 'should subtract milliseconds from the time object', function(){
            var time = Time( 15 );
            time.subtract( 5 );
            time.toMilliseconds().should.equal( 10 );
        });

        it( 'should return itself', function(){
            var time            = Time( 15 );
            var subtractResult  = time.subtract( 5 );
            should.exist( subtractResult );
            subtractResult
                .should.be.an.instanceOf( Time )
                .and.equal( time );
        });
    });

    describe( '#toDate', function(){
        it( 'should throw an exception if the object is not a fixed point in time', function(){
            var time = Time( 5 );
            time.toDate.bind( time ).should.throw( /^Convert time to timepoint/ );
            time.fromUnixEpoch().toDate.bind( time ).should.not.throw();
        });

        it( 'should return a Date object with the same time', function(){
            var time    = Time( 5 ).fromUnixEpoch();
            var date    = time.toDate();
            should.exist( date );

            // XXX A bug in should.js prevents this from working.
            // https://github.com/visionmedia/should.js/issues/65
            //date.should.be.an.instanceOf( Date );

            (date instanceof Date).should.be.true;
            date.getTime().should.equal( 5 );
        });
    });

    describe( '#toDays', function(){
        it( 'should return the time value in days', function(){
            var time    = Time( 86400000 );
            var value   = time.toDays();
            should.exist( value );
            value
                .should.be.a( 'number' )
                .and.equal( 1 );
        });
    });

    describe( '#toHours', function(){
        it( 'should return the time value in hours', function(){
            var time    = Time( 3600000 );
            var value   = time.toHours();
            should.exist( value );
            value
                .should.be.a( 'number' )
                .and.equal( 1 );
        });
    });

    describe( '#toMilliseconds', function(){
        it( 'should return the time value in milliseconds', function(){
            var time    = Time( 5 );
            var value   = time.toMilliseconds();
            should.exist( value );
            value
                .should.be.a( 'number' )
                .and.equal( 5 );
        });
    });

    describe( '#toMinutes', function(){
        it( 'should return the time value in minutes', function(){
            var time    = Time( 60000 );
            var value   = time.toMinutes();
            should.exist( value );
            value
                .should.be.a( 'number' )
                .and.equal( 1 );
        });
    });

    describe( '#toSeconds', function(){
        it( 'should return the time value in seconds', function(){
            var time    = Time( 1000 );
            var value   = time.toSeconds();
            should.exist( value );
            value
                .should.be.a( 'number' )
                .and.equal( 1 );
        });
    });

    describe( '#toWeeks', function(){
        it( 'should return the time value in weeks', function(){
            var time    = Time( 604800000 );
            var value   = time.toWeeks();
            should.exist( value );
            value
                .should.be.a( 'number' )
                .and.equal( 1 );
        });
    });

});
