export function loadFile(file) {
  return new Promise((resolve, reject) => {
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
