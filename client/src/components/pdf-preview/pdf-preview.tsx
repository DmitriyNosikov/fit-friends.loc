import { ReactElement } from 'react';

import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const PageParams = {
  NUMBER: 1,
  WIDTH: 294,
  HEIGHT: 360
}

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

if (typeof Promise.withResolvers === 'undefined') {
  if (window)
      // @ts-expect-error This does not exist outside of polyfill which this is doing
      window.Promise.withResolvers = function () {
          let resolve, reject;
          const promise = new Promise((res, rej) => {
              resolve = res;
              reject = rej;
          });
          return { promise, resolve, reject };
      };
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  // 'pdfjs-dist/build/pdf.worker.min.mjs'
  'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


type PDFFile = string | File | null;
type PdfPreviewProps = {
  pdfFileUrl: PDFFile
}

export default function PdfPreview({ pdfFileUrl }: PdfPreviewProps): ReactElement {
  return (
    <Document file={pdfFileUrl} options={options} >
      <Page pageNumber={PageParams.NUMBER} width={PageParams.WIDTH} height={PageParams.HEIGHT} />
    </Document>
  )
}
