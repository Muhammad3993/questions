// tesseract.d.ts
declare module 'tesseract.js' {
  export interface Tesseract {
    recognize: (image: string, lang: string, options: any) => Promise<{ data: { text: string } }>;
    // Add other methods and properties as needed
  }

  const Tesseract: Tesseract;
  export default Tesseract;
}
