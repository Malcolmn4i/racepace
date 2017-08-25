'use strict'

module.exports = function(){

    switch(process.env.NODE_ENV){
        case 'development':

            return{

                name: 'racebook',
                version: '0.0.1',
                secret: 'Roberts1994Grimbreek',
                jwtSession: {
                    session: false
                },
                env: process.env.NODE_ENV || 'development',
                port: process.env.PORT || 8081,
                base_url: process.env.BASE_URL || 'http://127.0.0.1:8081',
                db: {
                    uri: 'mongodb://127.0.0.1:27017/RacebookDB',
                },

            }

        case 'staging':

            return{

                name: 'racebook',
                version: '0.0.1',
                secret: 'Roberts1994Grimbreek',
                jwtSession: {
                    session: false
                },
                env: process.env.NODE_ENV || 'staging',
                port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
                base_url: process.env.OPENSHIFT_NODEJS_IP || 'http://127.0.0.1:8080',
                db: {
                    uri: 'mongodb://172.30.124.154:27017/sampledb'
                },
            }


        case 'live':

            return{

                name: 'racebook',
                version: '0.0.1',
                secret: 'Roberts1994Grimbreek',
                jwtSession: {
                    session: false
                },
                env: process.env.NODE_ENV || 'live',
                port: process.env.PORT || 8083,
                base_url: process.env.BASE_URL || 'http://127.0.0.1:8081',
                db: {
                    uri: 'mongodb://127.0.0.1:27017/RacebookDB',
                },

            }

    }
}