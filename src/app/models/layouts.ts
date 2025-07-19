export interface Layout{
  id: string;
  Width: number;
  Height: number;
  Left: number;
  Top: number;
}
export interface HtmlLayout{
  pageId: number;
  width: number;
  height: number;
  children: Layout[];
}
