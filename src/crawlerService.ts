import { Chromeless } from 'chromeless';
import CrawlerUtils from './crawlerUtils';

export default class CrawlerService {
  private chromeless: Chromeless<{}>;
  private snapshotPath: string;
  private useragent: string;
  private filterLinksRegex: RegExp;

  constructor(
    snapshotPath: string = './snapshots',
    useragent: string,
    remote: boolean = false,
    filterLinksRegex: string
  ) {
    const options = { launchChrome: false, remote: remote, waitTimeout: 30000 };
    this.chromeless = new Chromeless(options);
    this.snapshotPath = snapshotPath;
    this.useragent = useragent;
    this.filterLinksRegex = filterLinksRegex ? new RegExp(filterLinksRegex) : null;
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
    console.log('* Opening url ' + url + ' and parsing links');
    const linksArray = await CrawlerUtils.openAndParseUrlLinks(url);
    if (linksArray) {
      // filter links
      const testLinksArray = linksArray.filter(
        url => url && url.length > 0 && (!this.filterLinksRegex || this.filterLinksRegex.test(url))
      );
      // Process links in chunks
      let i, j;
      console.log(`* Crawling ${testLinksArray.length} test Urls from ${linksArray.length} links found.`);
      for (i = 0, j = testLinksArray.length; i < j; i += chunk) {
        // Preparing chunk
        const start = i;
        const end = start + chunk < testLinksArray.length ? start + chunk : testLinksArray.length;
        const testUrlChunk = testLinksArray.slice(start, end);
        // Executing test data chunk
        console.log(`* Processing chunk ${i / chunk} size ${testUrlChunk.length} total processed  ${i}.`);
        await this.multiTaskOpenUrl(testUrlChunk);
      }
    }
  }

  /**
   * Ends crwaler session.
   */
  async endService() {
    await this.chromeless.end();
  }

  protected async multiTaskOpenUrl(testUrls: string[]) {
    try {
      // Creating tasks promises
      let openUrlsPromises = testUrls.map(url => this.openUrl(url));
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
    console.log(`* Opening Url ${url}.`); 
    return new Promise((resolve, reject) => {
      this.chromeless
        .goto(url)
        .setUserAgent(this.useragent)
        .screenshot(undefined, {
          filePath: CrawlerUtils.toSnapshotFilePath(url, this.snapshotPath)
        })
        .then(async (screenshot: any) => {
          resolve(screenshot);
        })
        .catch((err: any) => reject(err));
    });
  }
}
