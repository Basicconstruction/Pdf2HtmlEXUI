export interface Layout{
  id: string;
  Width: number;
  Height: number;
  Left: number;
  Top: number;
}
export interface HtmlLayout{
  pageWidth: number;
  pageHeight: number;
  layouts: Layout[];
}
