export async function uploadTextFile() {
  return new Promise<UploadedTextFile>((res) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as any).files[0];
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (readerEvent) => {
        console.log((readerEvent.target as any).result);
        res({
          name: file.name.substring(0, file.name.lastIndexOf('.')),
          extension: file.name.substring(file.name.lastIndexOf('.') + 1).toLocaleLowerCase(),
          content: (readerEvent.target as any).result,
        });
      };
    };
    input.click();
  });
}

type UploadedTextFile = {
  name: string;
  extension: string;
  content: string;
};
