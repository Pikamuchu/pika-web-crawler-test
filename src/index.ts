import { Command, flags } from '@oclif/command';
import CrawlerService from './crawlerService';
import ChromeService from './chromeService';
import CrawlerUtils from './crawlerUtils';

class CrawlerTest extends Command {
  static DEFAULT_CHUNK = 1;
  static DEFAULT_PATH_SNAPSHOTS = './snapshots';
  static DEFAULT_USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36';

  static description = 'Pika web crawler test script';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    pathSnapshots: flags.string({
      char: 'p',
      description: 'Base path for snapshots',
      default: CrawlerTest.DEFAULT_PATH_SNAPSHOTS
    }),
    chunk: flags.string({
      char: 'c',
      description: 'Number of concurrent url calls',
      default: `${CrawlerTest.DEFAULT_CHUNK}`
    }),
    notLaunchChrome: flags.boolean({ char: 'n', description: `Don't auto-launch chrome (local)` }),
    remote: flags.boolean({ char: 'r', description: 'Use remote chrome process' }),
    useragent: flags.string({
      char: 'u',
      description: 'Useragent of the browser',
      default: CrawlerTest.DEFAULT_USER_AGENT
    }),
    filterLinksRegex: flags.string({
      char: 'f',
      description: 'Regex for filter URL links'
    })
  };

  static args = [{ name: 'url', required: true, description: 'Url to open and parse links' }];

  async run() {
    const { args, flags } = this.parse(CrawlerTest);

    console.log('*********** Starting web crawler test **************');
    console.log('*');
    console.log('* Url: ' + args.url);
    console.log('*');

    let exitCode = 0;
    let chromeService;
    let crawlerService;

    try {

      // Starting Chrome
      if (!flags.notLaunchChrome) {
        chromeService = new ChromeService();
        await chromeService.start();
      }

      // Opening crawler session
      crawlerService = new CrawlerService(flags.pathSnapshots, flags.useragent, flags.remote, flags.filterLinksRegex);

      // Read test data
      await crawlerService.crawlUrl(args.url, flags.chunk ? parseInt(flags.chunk) : CrawlerTest.DEFAULT_CHUNK);

    } catch (error) {
      exitCode = 2;
      console.error('An error ocurred:');
      console.error(error);
    } finally {
      // Closing crawler session
      if (crawlerService) {
        await crawlerService.endService();
      }
      // Closing chrome session
      if (chromeService) {
        await chromeService.stop();
      }
    }

    console.log('*');
    console.log('*********** Crawler test end **************');

    process.exit(exitCode);
  }
}

export = CrawlerTest;
