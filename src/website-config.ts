export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  facebook: string;
  twitter: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName: string;

  /**
   * Font setup
   */
  fontFamily: string;
  fontMonoFamily: string;
}

const config: WebsiteConfig = {
  title: 'Koodibar',
  description: 'Koodibar - The code bar',
  coverImage: 'img/blog-cover.jpg',
  logo: 'img/ghost-logo.png',
  siteUrl: 'https://koodibar.com',
  facebook: 'https://www.facebook.com/koodibar',
  twitter: 'https://twitter.com/koodibar',
  showSubscribe: true,
  mailchimpAction: 'https://twitter.us19.list-manage.com/subscribe/post?u=a89b6987ac248c81b0b7f3a0f&amp;id=7d777b7d75',
  mailchimpName: '',
  fontFamily: "'Noto Sans', sans-serif",
  fontMonoFamily: "'Inconsolata', monospace",
};

export default config;
