import Papa from 'papaparse';

export function parse<T>(file: File, callback: (data: T[]) => void) {
  Papa.parse<T>(file, {
    delimiter: ';',
    header: true,
    dynamicTyping: true,
    chunk: (results) => {
      callback(results.data);
    },
  });
}
