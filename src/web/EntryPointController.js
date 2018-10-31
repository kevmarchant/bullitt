import { Controller } from '.';
import { Get } from '../http';

@Controller()
class EntryPointController {

  constructor(links) {
    this.links = links;
  }

  @Get('/')
  Index({ res }) {
    const curies = [{
      name: 'CURIENAME',
      href: 'CURIEHREF{rel}',
      templated: true
    }];

    const response = { _links: { self: { href: '/' } } };

    this.links.forEach(({ rel, href }) => {
      response._links[rel] = { href };
    });

    response.curies = curies;

    res.json(response);
  }
}

export default EntryPointController;
