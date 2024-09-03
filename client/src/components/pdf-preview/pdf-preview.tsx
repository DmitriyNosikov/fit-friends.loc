import { ReactElement } from 'react';

import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const PageParams = {
  NUMBER: 1,
  WIDTH: 294
}

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


type PDFFile = string | File | null;
type PdfPreviewProps = {
  pdfFileUrl: PDFFile
}

export default function PdfPreview({ pdfFileUrl }: PdfPreviewProps): ReactElement {
  return (
    <Document file={pdfFileUrl} options={options} >
      <Page pageNumber={PageParams.NUMBER} width={PageParams.WIDTH} />
    </Document>
  )
}
