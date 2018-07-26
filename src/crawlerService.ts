import { Chromeless } from 'chromeless';
import CrawlerUtils from './crawlerUtils';

export default class CrawlerService {
  private masterChromeless: Chromeless<{}>;
  private snapshotPath: string;

  constructor(snapshotPath: string = './snapshots') {
    this.masterChromeless = new Chromeless();
    this.snapshotPath = snapshotPath;
  }

  /**
   * Crawls the given url.
   *
   * @param url
   * @param chunk
   */
  async crawlUrl(url: string, chunk: number) {
    // Do some sleep in order to assure chrome startup
    await CrawlerUtils.sleep();
    // Parsing url
    const testLinksArray = await CrawlerUtils.openAndParseUrlLinks(url);
    if (testLinksArray) {
      // Process links in chunks
      let i, j;
      console.log('* Total test urls ' + testLinksArray.length);
      for (i = 0, j = testLinksArray.length; i < j; i += chunk) {
        // Preparing chunk
        const start = i;
        const end = start + chunk < testLinksArray.length ? start + chunk : testLinksArray.length;
        const testUrlChunk = testLinksArray.slice(start, end);
        // Executing test data chunk
        console.log('* Processing chunk ' + i / chunk + ' size ' + testUrlChunk.length + ' total processed ' + i);
        await this.multiTaskOpenUrl(testUrlChunk);
      }
    }
  }

  /**
   * Ends crwaler session.
   */
  async endService() {
    await this.masterChromeless.end();
  }

  protected async multiTaskOpenUrl(testUrls: string[]) {
    try {
      // Creating tasks promises
      let openUrlsPromises = testUrls.filter(url => url && url.length > 0).map(url => this.openUrl(url));
      // Executing tasks
      if (openUrlsPromises && openUrlsPromises.length) {
        const screenshots = await Promise.all(openUrlsPromises);
        // Print screenshots
        screenshots.forEach(screenshot => console.log(screenshot));
      }
    } catch (error) {
      console.error('Unexpected error ocurred: ' + error);
    }
  }

  protected openUrl(url: string): Promise<string> {
    // Opening url on headless chrome
    return new Promise((resolve, reject) => {
      const chromeless = new Chromeless({ launchChrome: false });
      chromeless
        .goto(url)
        .screenshot(undefined, {
          filePath: CrawlerUtils.toSnapshotFilePath(url, this.snapshotPath)
        })
        .then(async (screenshot: any) => {
          await chromeless.end();
          resolve(screenshot);
        })
        .catch((err: any) => reject(err));
    });
  }
}
