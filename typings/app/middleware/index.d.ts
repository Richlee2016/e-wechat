// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCache from '../../../app/middleware/cache';
import ExportValidator from '../../../app/middleware/validator';

declare module 'egg' {
  interface IMiddleware {
    cache: typeof ExportCache;
    validator: typeof ExportValidator;
  }
}
