export class Api {

  constructor(mark: string) {
    console.log(mark);
    console.log(this)
  }

  public async Request(options): Promise<any> {
    const {Method, Router, Params, Params: {Action, Version}} = options;
    const {Timeout, Frequency, Restore, Convert} = options;
  }
}
