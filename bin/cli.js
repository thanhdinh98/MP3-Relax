#!/usr/bin/env node

const PlayMusic = require('..');
const {version, index} = require('../cmd');
const args = require('minimist')(process.argv.slice(2));

const VIET_NAM = {
    NHAC_TRE: 'ZWZB969E',
    NHAC_TRU_TINH: 'ZWZB969F',
    QUE_HUONG: 'ZWZB96AU',
    CACH_MANG: 'ZWZB96AO',
    RAP_HIPHOP: 'ZWZB96AI',
    ROCK: 'ZWZB96A0',
    DANCE: 'ZWZB96AW'
};

const AU_MY = {
    NHAC_POP: 'ZWZB96AB',
    NHAC_ROCK: 'ZWZB96AC',
    RAP_HIPHOP: 'ZWZB96AD',
    NHAC_COUNTRY: 'ZWZB96AE',
    NHAC_ED: 'ZWZB96C7',
    NHAC_RB: 'ZWZB96C8',
    NHAC_AUDI: 'ZWZB96D8'
};

const CHAU_A = {
    NHAC_HAN: 'ZWZB96DC',
    NHAC_NHAT: 'ZWZB96DF',
    NHAC_HOA: 'ZWZB96EI'
};

const HOA_TAU = {
    NHAC_CLA: 'ZWZB96EW',
    NHAC_PIA: 'ZWZB96EU',
    NHAC_GUI: 'ZWZB96EZ',
    NHAC_VIO: 'ZWZB96E6',
    NHAC_CELL: 'ZWZB96E7',
    NHAC_SAX: 'ZWZB96E8'
};

(()=>{

    let ID = '';
    let path = '';

    let cmd = args._[0] || 'help';

    if(args.version || args.v){
        cmd = 'version';
    }

    if(args.help || args.h){
        cmd = 'help';
    }

    if(args.nhac && args.tl && args._[0]){
        cmd = 'play';
        path = args._[0];

        switch(args.nhac){
            case 'vn':
                switch(args.tl){
                    case 1: ID = VIET_NAM.NHAC_TRE;
                        break;
                    case 2: ID = VIET_NAM.NHAC_TRU_TINH;
                        break;
                    case 3: ID = VIET_NAM.QUE_HUONG;
                        break;
                    case 4: ID = VIET_NAM.CACH_MANG;
                        break;
                    case 5: ID = VIET_NAM.RAP_HIPHOP;
                        break;
                    case 6: ID = VIET_NAM.ROCK;
                        break;
                    case 7: ID = VIET_NAM.DANCE;
                        break;
                    default: cmd = 'tl-error';
                }
                break;
            case 'am':
                switch(args.tl){
                    case 1: ID = AU_MY.NHAC_POP;
                        break;
                    case 2: ID = AU_MY.NHAC_ROCK;
                        break;
                    case 3: ID = AU_MY.RAP_HIPHOP;
                        break;
                    case 4: ID = AU_MY.NHAC_COUNTRY;
                        break;
                    case 5: ID = AU_MY.NHAC_ED;
                        break;
                    case 6: ID = AU_MY.NHAC_RB;
                        break;
                    case 7: ID = AU_MY.NHAC_AUDI;
                        break;
                    default: cmd = 'tl-error';
                }
                break;
            case 'ca':
                switch(args.tl){
                    case 1: ID = CHAU_A.NHAC_HAN;
                        break;
                    case 2: ID = CHAU_A.NHAC_NHAT;
                        break;
                    case 3: ID = CHAU_A.NHAC_HOA;
                        break;
                    default: cmd = 'tl-error';
                }
                break;
            case 'ht':
                switch(args.tl){
                    case 1: ID = HOA_TAU.NHAC_CLA;
                        break;
                    case 2: ID = HOA_TAU.NHAC_PIA;
                        break;
                    case 3: ID = HOA_TAU.NHAC_GUI;
                        break;
                    case 4: ID = HOA_TAU.NHAC_VIO;
                        break;
                    case 5: ID = HOA_TAU.NHAC_CELL;
                        break;
                    case 6: ID = HOA_TAU.NHAC_SAX;
                        break;
                    default:  cmd = 'tl-error';
                }
                break;
            default: cmd = 'nhac-error';
        }
    }else{
        cmd = 'help';
    }

    switch(cmd){
        case 'help': index(args);
            break;
        case 'version': version(args)
            break;
        case 'play': PlayMusic(ID, path);
            break;
        case 'nhac-error': console.log('Không có option cho nhạc này!');
            break;
        case 'tl-error': console.log('Không có option cho thể loại nhạc này!');
            break;
        default:
            console.error(`Không tồn tại lệnh "${cmd}"!`);
    }
})();
