import { Config } from './config';
import { Apis } from './apis';

export class LukSDK {
  public readonly config: Config;
  public readonly apis: Apis;

  constructor(config: Config) {
    this.config = config;
    this.apis = new Apis(this);
  }

  public getApis(): Apis {
    return this.apis;
  }
}

