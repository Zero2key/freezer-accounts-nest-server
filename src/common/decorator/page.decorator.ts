import { createParamDecorator } from '@nestjs/common';
import { PageParams } from '../interface';

export const Page = createParamDecorator(
  (data = 10, req): PageParams => {
    const pageNo = Number.parseInt(req.query.pageNo, 10);
    const pageSize = Number.parseInt(req.query.pageSize, 10);
    return {
      pageNo: pageNo || 1,
      pageSize: pageSize || data,
    };
  },
);
