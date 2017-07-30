import { NoveryPage } from './app.po';

describe('novery App', () => {
  let page: NoveryPage;

  beforeEach(() => {
    page = new NoveryPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
