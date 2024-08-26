export default function fileDownload(propertie: string = 'urlFile') {
  return ({ props }: any) => {
    const link = document.createElement('a');
    const url: string = (props as any)[propertie];
    const array = url.split('/');
    link.href = url;
    link.download = array[array.length - 1];
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };
}
