// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBook from '../../../app/middleware/book';
import ExportCache from '../../../app/middleware/cache';
import ExportErrorHandler from '../../../app/middleware/error_handler';
import ExportValidator from '../../../app/middleware/validator';

declare module 'egg' {
  interface IMiddleware {
    book: typeof ExportBook;
    cache: typeof ExportCache;
    errorHandler: typeof ExportErrorHandler;
    validator: typeof ExportValidator;
  }
}
