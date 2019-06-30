const menu = {
  main: `
        Sử dụng: mp3 <nhac> <the-loai> <duong-dan>

        Ví dụ: mp3 --nhac=vn --tl=1 /home/home/Desktop

        nhac ................. xác định loại nhạc
        the-loai ............. xác định thể loại của loại nhạc đã chọn
        duong-dan ............ xác định đường dẫn để lưu trữ list nhạc

        Xem chi tiết options <nhac>:     mp3 help nhac

        Xem chi tiết options <the-loai>: mp3 help <nhac>=tl
        Ví dụ: mp3 help --vn=tl
    `,

  nhac: `
        Thể loại nhạc

        Sử dụng: mp3 --nhac=<option> ...

        vn : nhạc việt nam
        am : nhạc ây mỹ
        ca : nhạc châu á
        ht : nhạc hòa tấu
    `,

  theLoaiVn: `
        Thể loại cho nhạc Việt Nam

        Sử dụng: mp3 --tl=<options> ...

        1 : nhạc trẻ
        2 : nhạc trữ tình
        3 : nhạc quê hương
        4 : nhạc cách mạng
        5 : nhạc rap / hip hop
        6 : nhạc rock
        7 : nhạc dance
    `,

  theLoaiAm: `
        Thê loại cho nhạc Âu Mỹ

        Sử dụng: mp3 --tl=<options> ...

        1 : nhạc pop
        2 : nhạc rock
        3 : nhạc rap/hip hop
        4 : nhạc country
        5 : nhạc electronic/dance
        6 : nhạc R&B
        7 : nhạc audiophile
    `,

  theLoaiCa: `
        Thể loại cho nhạc Châu Á

        Sử dụng: mp3 --tl=<options> ...

        1 : nhạc hàn
        2 : nhạc nhật bản
        3 : nhạc hoa ngữ
    `,

  theLoaiHt: `
        Thể loại cho nhạc Hòa Tấu

        Sử dụng: mp3 --tl=<options> ...

        1 : nhạc classical
        2 : nhạc piano
        3 : nhạc guitar
        4 : nhạc viollin
        5 : nhạc cello
        6 : nhạc saxophone
    `,
};

module.exports = (args) => {
  let subCmd = '';
  if (args._[1] === 'nhac') subCmd = 'nhac';
  if (args.vn) subCmd = 'theLoaiVn';
  if (args.am) subCmd = 'theLoaiAm';
  if (args.ca) subCmd = 'theLoaiCa';
  if (args.ht) subCmd = 'theLoaiHt';

  console.log(menu[subCmd] || menu.main);
};
