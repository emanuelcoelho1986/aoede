import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl} from "@angular/platform-browser";

/**
 * Solution based on https://medium.com/@swarnakishore/angular-safe-pipe-implementation-to-bypass-domsanitizer-stripping-out-content-c1bf0f1cc36b
 * With an introduction of an enum for type management
 */
export enum SafeTypeEnum {
  HTML,
  STYLE,
  SCRIPT,
  URL,
  RESOURCE_URL
}
@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}

  public transform(value: any, type: SafeTypeEnum = SafeTypeEnum.HTML): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case SafeTypeEnum.HTML: return this.sanitizer.bypassSecurityTrustHtml(value);
      case SafeTypeEnum.STYLE: return this.sanitizer.bypassSecurityTrustStyle(value);
      case SafeTypeEnum.SCRIPT: return this.sanitizer.bypassSecurityTrustScript(value);
      case SafeTypeEnum.URL: return this.sanitizer.bypassSecurityTrustUrl(value);
      case SafeTypeEnum.RESOURCE_URL: return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }

}
