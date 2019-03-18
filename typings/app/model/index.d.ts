// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBook from '../../../app/model/book';
import ExportChapter from '../../../app/model/chapter';
import ExportMessage from '../../../app/model/message';
import ExportToken from '../../../app/model/token';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Book: ReturnType<typeof ExportBook>;
    Chapter: ReturnType<typeof ExportChapter>;
    Message: ReturnType<typeof ExportMessage>;
    Token: ReturnType<typeof ExportToken>;
    User: ReturnType<typeof ExportUser>;
  }
}
