import { Request } from "express";

export class Pagination {
    offset: number;
    page: number;
    limit: number;
    to: number;
  
    constructor(offset: number, page: number, limit: number, to: number) {
      this.offset = offset;
      this.page = page;
      this.limit = limit;
      this.to = to;
    }
  
    static getPagination = (req: Request) => {
      const limit = isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit);
      const page = isNaN(Number(req.query.page)) ? 1 : Number(req.query.page);
      const offset = (page - 1) * limit;
      const to = offset + limit - 1;
  
      return { limit, page, offset, to };
    };
  }