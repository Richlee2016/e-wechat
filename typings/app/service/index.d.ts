// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBook from '../../../app/service/Book';
import ExportHome from '../../../app/service/Home';
import ExportMatter from '../../../app/service/Matter';
import ExportMessage from '../../../app/service/Message';
import ExportMovie from '../../../app/service/Movie';
import ExportTest from '../../../app/service/Test';
import ExportToken from '../../../app/service/Token';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    book: ExportBook;
    home: ExportHome;
    matter: ExportMatter;
    message: ExportMessage;
    movie: ExportMovie;
    test: ExportTest;
    token: ExportToken;
    user: ExportUser;
  }
}
