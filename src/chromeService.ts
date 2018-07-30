import * as chromeLauncher from 'chrome-launcher';

export default class ChromeService {
  private chrome: any;
  private port: number = 9222;
  private chromeFlags: string[] = ['--headless', '--disable-gpu'];

  constructor() {}

  /**
   * Start chome.
   */
  async start() {
    console.log('* Starting chrome');
    this.chrome = await this.launch();
  }

  /**
   * Stop chrome.
   */
  async stop() {
    try {
      const result = await this.kill();
      console.log('* Chrome stopped.');
    } catch (error) {
      console.log(`Cannot stop chrome. Error: ${error}`);
    }
  }

  private async launch() {
    return chromeLauncher.launch({
      port: this.port,
      chromeFlags: this.chromeFlags
    });
  }

  private async kill() {
    return this.chrome.kill();
  }
}
