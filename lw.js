
var _ = require( 'underscore' );

var lw = {

    bindNth : function( func, position ){
        var bound = _.toArray( arguments );
        bound[ 0 ] = position - 1;
        bound[ 1 ] = 0;
        return function(){
            var args = _.toArray( arguments );
            while( bound[ 0 ] > args.length ){
                args.push( undefined );
            }
            args.splice.apply( args, bound );
            return func.apply( this, args );
        };
    },

    isArray : function( obj ){
        return obj instanceof Array || obj.constructor === Array;
    },

    isFunction : function( obj ){
        return typeof obj == 'function';
    },

    isObject : function( obj ){
        return obj instanceof Object && obj.constructor === Object;
    },

    isString : function( obj ){
        return typeof obj == 'string';
    },

    makeEnum : function( keys, offset ){
        var enm = {};
        offset = offset || 0;
        for( var i = 0; i < keys.length; ++i ){
            enm[ keys[ i ] ] = i + offset;
        }

        enm.toString = function( val ){
            return keys[ val - offset ];
        };

        enm.isMember = function( val ){
            return val >= offset && val < keys.length + offset;
        };

        return enm;
    },

    titleCase : function( str ){
        return String( str ).replace( /\b(.)/g, function( m, $1 ){ return $1.toUpperCase(); } );
    }
};

lw.bind1st = lw.bindNth( lw.bindNth, 2, 1 );
lw.bind2nd = lw.bindNth( lw.bindNth, 2, 2 );
lw.bind3rd = lw.bindNth( lw.bindNth, 2, 3 );

lw.time = require( './lib/time' );

module.exports = lw;
