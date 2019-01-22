// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBook from '../../../app/controller/book';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    book: ExportBook;
    home: ExportHome;
  }
}
