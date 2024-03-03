import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const corsOriginRegExp = /^localhost(:\d+)?$/;

const corsOptions: CorsOptions = {
  origin: corsOriginRegExp,
};

export default corsOptions;
