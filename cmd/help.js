const menu = {
    main: `
        Su dung: mp3 <nhac> <the-loai> <duong-dan>

        Vi du: mp3 --nhac=vn --tl=1 /home/home/Desktop

        nhac ................. xac dinh nhac
        the-loai ............. xac dinh the loai
        duong-dan ............ xac dinh duong dan luu tru list nhac

        Xem chi tiet options <nhac>:     mp3 help nhac

        Xem chi tiet options <the-loai>: mp3 help <nhac>=<the-loai> 
        Vi du: mp3 help --vn=tl
    `,

    nhac:`
        mp3 --nhac=<option> ...

        vn : nhac viet nam
        am : nhac au my
        ca : nhac chau a
        ht : nhac hoa tau
    `,

    theLoaiVn: `
        mp3 --tl=<options> ...

        1 : nhac tre
        2 : nhac tru tinh
        3 : nhac que huong
        4 : nhac cach mang
        5 : nhac rap / hip hop
        6 : nhac rock
        7 : nhac dance
    `,

    theLoaiAm:`
        mp3 --tl=<options> ...

        1 : nhac pop
        2 : nhac rock
        3 : nhac rap/hip hop
        4 : nhac country
        5 : nhac electronic/dance
        6 : nhac R&B
        7 : nhac audiophile
    `,

    theLoaiCa:`
        mp3 --tl=<options> ...

        1 : nhac han
        2 : nhac nhat ban
        3 : nhac hoa ngu
    `,

    theLoaiHt:`
        mp3 --tl=<options> ...

        1 : nhac classical
        2 : nhac piano
        3 : nhac guitar
        4 : nhac viollin
        5 : nhac cello
        6 : nhac saxophone
    `,
};

module.exports = (args)=>{
    let subCmd = '';
    if(args._[1] === 'nhac') subCmd = 'nhac';
    if(args.vn) subCmd = 'theLoaiVn';
    if(args.am) subCmd = 'theLoaiAm';
    if(args.ca) subCmd = 'theLoaiCa';
    if(args.ht) subCmd = 'theLoaiHt';

    console.log(menu[subCmd] || menu.main);
}