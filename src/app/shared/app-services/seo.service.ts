import {Injectable} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})

export class SeoService {
  defaultDescription = 'OptiCity - це завжди величезний вибір окулярів на Ваш настрій і смак! З нами ви дивитимитеся на життя по-новому! ;)';

  constructor(private title: Title, private meta: Meta) {
  }


  updateTitle(title: string) {
    title = title ? title + ' | OptiCity' : 'OptiCity';
    this.title.setTitle(title);
    this.meta.updateTag({property: 'og:title', content: title});

  }

  updateOgUrl(url: string) {
    this.meta.updateTag({property: 'og:url', content: url ? url : window.location.href});
  }

  updateOgImage(image: string) {
    this.meta.updateTag({property: 'og:image', content: image ? image : 'https://opticity.com.ua/assets/og_image.jpg'});
  }

  updateDescription(desc: string) {
    this.meta.updateTag({name: 'description', content: desc ? desc : this.defaultDescription});
    this.meta.updateTag({property: 'og:description', content: desc ? desc : this.defaultDescription});
  }
}
