import { Command, flags } from '@oclif/command';
import CrawlerService from './crawlerService';
import ChromeService from './chromeService';
import CrawlerUtils from './crawlerUtils';

class CrawlerTest extends Command {
  static description = 'Pika web crawler test script';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    pathSnapshots: flags.string({ char: 'p', description: 'Base path for snapshots' })
  };

  static args = [
    { name: 'initialUrl', required: true, description: 'Initial Url to open and parse links' },
    { name: 'chunk', required: false, description: 'Number of concurrent url calls', hidden: false, default: '2' }
  ];

  async run() {
    console.log('*********** Starting web crawler test **************');
    console.log('*');

    let chromeService;
    let crawlerService;

    try {
      const { args, flags } = this.parse(CrawlerTest);

      if (!args.initialUrl) {
        throw 'Parameter "initialUrl" is required!';
      }

      console.log('* Initial Url: ' + args.initialUrl);
      console.log('* Chunks: ' + args.chunk);
      console.log('*');

      // Starting Chrome
      chromeService = new ChromeService();
      console.log('* Starting chrome');
      await chromeService.start();

      // Opening crawler session
      crawlerService = new CrawlerService(flags.pathSnapshots);

      // Read test data
      console.log('* Opening url ' + args.initialUrl + ' and parsing links');
      await crawlerService.crawlUrl(args.initialUrl, parseInt(args.chunk));
    } catch (error) {
      console.error('An error ocurred:');
      console.error(error);
      process.exit(1);
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
    process.exit();
  }
}

export = CrawlerTest;
