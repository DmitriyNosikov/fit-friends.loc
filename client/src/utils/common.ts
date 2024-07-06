export function upperCaseFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function areArraysEqual(arrayA: unknown[], arrayB: unknown[]) {
  return arrayA.toString() === arrayB.toString();
}

export function getImgPreviewLink(img: File, onLoad?: Function) {
  const fileReader = new FileReader();

    fileReader.readAsDataURL(img);

    fileReader.addEventListener('loadend', () => {
      if(!onLoad) {
        return fileReader.result;
      }

      onLoad(fileReader.result);
    })
}
