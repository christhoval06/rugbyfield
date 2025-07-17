export function loadFile(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('File no valid');
      }
    };

    reader.onerror = () => reject('Error al leer archivo');
    reader.readAsText(file);
  });
}
