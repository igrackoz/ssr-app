import { isPlatformServer } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PricingPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {

    this.title.setTitle('Pricing Page');
    this.meta.updateTag(
      { name: 'description', content: 'Este es mi Pricing page' }
    );    
    this.meta.updateTag(
      { name: 'og:title', content: 'Este es mi Pricing page' }
    );
    this.meta.updateTag(
      { name: 'keywords', content: 'hola,mundo,hector,ortiz,curso,angular' }
    );
  }
}

