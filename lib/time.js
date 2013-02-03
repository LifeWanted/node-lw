
var _ = require( 'underscore' );

const MS_IN = {
    NANOSECOND  : 0.00001,
    MICROSECOND : 0.001,
    MILLISECOND : 1,
    SECOND      : 1000,
    MINUTE      : 60000,
    HOUR        : 3600000,
    DAY         : 86400000,
    WEEK        : 604800000,
    MONTH       : 2630000000,
    YEAR        : 31560000000
};

var Time = (function(){
    function Time( timePoint ){
        if( !(this instanceof Time) ){
            if( timePoint instanceof Time ){
                return timePoint;
            }
            else {
                return new Time( timePoint );
            }
        }

        this._isTimePoint   = timePoint instanceof Date;
        this._time          = _getMS( timePoint );
    }

    function _getMS( timePoint ){
        if( timePoint instanceof Time ){
            return timePoint._time;
        }
        else if( timePoint instanceof Date ){
            return timePoint.getTime();
        }
        else if( typeof timePoint == 'number' ){
            return timePoint;
        }
        else if( typeof timePoint == 'string' && !isNaN( timePoint ) ){
            return Number( timePoint );
        }
        else {
            throw new Error( 'Unsupported time value type: ' + (typeof timePoint) );
        }
    }

    var TimeProto = _.extend( Time.prototype, {
        add : function( otherTime ){
            this._time += _getMS( otherTime );
            return this;
        },

        diff : function( otherTime ){
            return Time( _getMS( otherTime ) - this._time );
        },

        diffFromNow : function(){
            return this.diff( time.now() );
        },

        fromUnixEpoch : function(){
            this._isTimePoint = true;
            return this;
        },

        isInFuture : function(){
            return time.nowAsTimestamp() < this._time;
        },

        isInPast : function(){
            return time.nowAsTimestamp() > this._time;
        },

        subtract : function( otherTime ){
            this._time -= _getMS( otherTime );
            return this;
        },

        toDate : function(){
            if( this._isTimePoint ){
                return new Date( this._time );
            }
            else {
                throw new Error( 'Convert time to timepoint before converting to a date.' );
            }
        },

        toDays : function(){
            return this._time / MS_IN.DAY;
        },

        toHours : function(){
            return this._time / MS_IN.HOUR;
        },

        toMilliseconds : function(){
            return this._time;
        },

        toMinutes : function(){
            return this._time / MS_IN.MINUTE;
        },

        toSeconds : function(){
            return this._time / MS_IN.SECOND;
        },

        toWeeks : function(){
            return this._time / MS_IN.WEEK;
        }
    });

    var dateMethodsToWrap = [
        'toDateString',
        'toISOString',
        'toGMTString',
        'toString',
        'toUTCString'
    ];
    for( var i in dateMethodsToWrap ){
        var method = dateMethodsToWrap[ i ];
        TimeProto[ method ] = function(){
            var date = this.toDate();
            return date[ method ].apply( date, arguments );
        };
    }

    return Time;
})();

var time = module.exports = {
    Time : Time,

    days : function( numDays ){
        return Time( numDays * MS_IN.DAY );
    },

    hours : function( numHours ){
        return Time( numHours * MS_IN.HOUR );
    },

    now : function(){
        return Time( time.nowAsTimestamp() ).fromUnixEpoch();
    },

    nowAsTimestamp : function(){
        return time.nowAsDate().getTime();
    },

    nowAsDate : function(){
        return new Date();
    }
};
