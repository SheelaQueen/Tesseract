import * as path from "path";

import TesseractClient from "./TesseractClient";

export default class TesseractClientMonitors {
  client: TesseractClient;

  constructor(client: TesseractClient) {
    this.client = client;
  }

  exec(event: string, ...argv: any[]) {
    let monitorPath = path.join(this.client.monitorsDirectory, event);
    let monitor = require(monitorPath);

    monitor(...argv);
  }
}
