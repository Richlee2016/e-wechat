export function bookSearch(
  q: string
): Promise<{
  type: string;
  name: string;
  href: string;
  newChapterHref: string;
  author: string;
  newChapter: string;
  status: string;
  update: string;
}>;

export function bookChapter(
  type: number,
  chapter: number
): Promise<{
  id: number;
  name: string;
  preid: number;
  author: string;
  newChapter: string;
  newChapterHref: string;
  status: string;
  update: string;
  context: string;
  chapters: string[{
    type: "dt" | "dd";
    text: string;
    href?: string;
  }];
}>;

export function bookContext(
  type: number,
  chapter: number,
  id: number
): Promise<{
  id: string;
  title: string;
  context: string;
}>;
