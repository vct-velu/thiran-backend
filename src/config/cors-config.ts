import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const corsOriginRegExp = /^.+\.nextstreet\.com(:3001)?$/;

const corsOptions: CorsOptions = {
  origin: corsOriginRegExp,
};

export default corsOptions;
