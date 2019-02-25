// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBook from '../../../app/controller/book';
import ExportHome from '../../../app/controller/home';
import ExportMatter from '../../../app/controller/matter';
import ExportUser from '../../../app/controller/user';
import ExportApiBook from '../../../app/controller/api/book';
import ExportApiNice from '../../../app/controller/api/nice';

declare module 'egg' {
  interface IController {
    book: ExportBook;
    home: ExportHome;
    matter: ExportMatter;
    user: ExportUser;
    api: {
      book: ExportApiBook;
      nice: ExportApiNice;
    }
  }
}
