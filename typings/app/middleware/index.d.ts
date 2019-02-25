// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBook from '../../../app/middleware/book';
import ExportCache from '../../../app/middleware/cache';
import ExportValidator from '../../../app/middleware/validator';

declare module 'egg' {
  interface IMiddleware {
    book: typeof ExportBook;
    cache: typeof ExportCache;
    validator: typeof ExportValidator;
  }
}
