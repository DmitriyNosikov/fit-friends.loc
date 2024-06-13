export const ProductType = {
  ELECTRO: 'electro',
  ACOUSTIC: 'acoustic',
  UKULELE: 'ukulele'
} as const;

const FIRST_PHOTO = "https://img.freepik.com/free-psd/realistic-guitar-mock-up_1022-50.jpg?w=826&t=st=1716907305~exp=1716907905~hmac=ee2b843ee9c79a37bbf0f97c964936231a2a7065f10449be541a8a485d17643e";
const SECOND_PHOTO = "https://img.freepik.com/premium-psd/guitar-strap-mokcup-design_23-2151226476.jpg?w=740";
const THIRD_PHOTO = "https://img.freepik.com/free-photo/electric-guitar-notepad-music-speaker-table-room-top-view_169016-52252.jpg?w=1380&t=st=1716907510~exp=1716908110~hmac=856ada8d504c3c7867eb247a0e1e880acaefc0c9fde5166cfa93626f01d9ae60";

export function getProducts() {
  return [
    {
      type: ProductType.ELECTRO,
      vendorCode: '662253e794534cbee6562f7d',
      title: 'Richie Sambora`s guitar',
      description: "Unique epic solo-master`s guitar",
      photo: FIRST_PHOTO,
      stringsCount: 6,
      price: 383490,
    },
    {
      type: ProductType.ACOUSTIC,
      vendorCode: '86224f68a3f9a165a1ab5fbk',
      title: 'Chester Bennington`s Acoustic Guitar',
      description: "LP solo-singer`s guitar",
      photo: SECOND_PHOTO,
      stringsCount: 7,
      price: 938541,
    },
    {
      type: ProductType.ELECTRO,
      vendorCode: '3f9a13e794534cbee64534cb',
      title: 'Just a test guitar',
      description: "Guitar to test for our customers",
      photo: THIRD_PHOTO,
      stringsCount: 12,
      price: 13880,
    }
  ];
}
