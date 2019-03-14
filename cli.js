#!/usr/bin/env node
const PlayMusic = require('./');
const [,, ...args] = process.argv;

const VIET_NAM = {
    NHAC_TRE: 'ZWZB969E',
    NHAC_TRU_TINH: 'ZWZB969F',
    QUE_HUONG: 'ZWZB96AU',
    CACH_MANG: 'ZWZB96AO',
    RAP_HIPHOP: 'ZWZB96AI',
    ROCK: 'ZWZB96A0',
    DANCE: 'ZWZB96AW'
};

(()=>{
    switch(args[0]){
        case 'vn':{
            switch(args[1]){
                case 'nhac-tre':{
                    PlayMusic(VIET_NAM.NHAC_TRE, args[2]);
                    break;
                }
                case 'nhac-tru-tinh':{
                    PlayMusic(VIET_NAM.NHAC_TRU_TINH, args[2]);
                    break;
                }
                case 'nhac-que-huong':{
                    PlayMusic(VIET_NAM.QUE_HUONG, args[2]);
                    break;
                }
                case 'nhac-cach-mang':{
                    PlayMusic(VIET_NAM.CACH_MANG, args[2]);
                    break;
                }
                case 'nhac-rap-hiphop':{
                    PlayMusic(VIET_NAM.RAP_HIPHOP, args[2]);
                    break;
                }
                case 'nhac-rock':{
                    PlayMusic(VIET_NAM.ROCK, args[2]);
                    break;
                }
                case 'nhac-dance':{
                    PlayMusic(VIET_NAM.DANCE, args[2]);
                    break;
                }
                default: {
                    console.log('Cannot find song');
                }
            }
            break;
        }
        case 'am':{
            break;
        }
        case 'ca':{
            break;
        }
    }
})();
