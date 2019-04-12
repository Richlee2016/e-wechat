// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBook from '../../../app/model/book';
import ExportChapter from '../../../app/model/chapter';
import ExportMessage from '../../../app/model/message';
import ExportMovie from '../../../app/model/movie';
import ExportToken from '../../../app/model/token';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Book: ReturnType<typeof ExportBook>;
    Chapter: ReturnType<typeof ExportChapter>;
    Message: ReturnType<typeof ExportMessage>;
    Movie: ReturnType<typeof ExportMovie>;
    Token: ReturnType<typeof ExportToken>;
    User: ReturnType<typeof ExportUser>;
  }
}
