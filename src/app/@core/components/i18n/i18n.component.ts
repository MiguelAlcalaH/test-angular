import { LOCALE_ID, Inject, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-i18n-selector',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.scss'],
})
export class I18nComponent implements OnInit {
  @Input() icon = false;
  supportedLanguages = ['en', 'es'];

  constructor(@Inject(LOCALE_ID) public locale: string) {}

  ngOnInit() {}

  setLanguage(language: string) {
    let path = '';
    let pathParameters = window.location.pathname.split('/');
    if (this.supportedLanguages.includes(pathParameters[1])) {
      for (var i = 2; i < pathParameters.length; i += 1) {
        path = '/' + pathParameters[i];
      }
      window.open('/' + language + path, '_self');
    } else {
      window.open('/' + language + window.location.pathname, '_self');
    }
  }

  get currentLanguage(): string {
    return this.locale;
  }

  get languages(): string[] {
    return this.supportedLanguages;
  }
}
