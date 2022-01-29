import {SafePipe, SafeTypeEnum} from './safe.pipe';
import {getTestBed, TestBed} from "@angular/core/testing";
import {BrowserTestingModule} from "@angular/platform-browser/testing";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

describe('SafePipe', () => {

  let domSanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserTestingModule
        ],
        providers: [
          {
            // Override sanitizer in order to check if the pipe will return
            // the same value we are passing
            provide: DomSanitizer,
            useValue: {
              sanitize: (ctx: any, val: string) => val,
              bypassSecurityTrustHtml: (val: string) => val,
              bypassSecurityTrustStyle: (val: string) => val,
              bypassSecurityTrustScript: (val: string) => val,
              bypassSecurityTrustResourceUrl: (val: string) => val,
              bypassSecurityTrustUrl: (val: string) => val
            },
          }
        ]
      });

    domSanitizer = getTestBed().inject(DomSanitizer);
  });

  it('create an instance', () => {
    let pipe = new SafePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });

  it('expect each type of value to return a different type of instance', () => {
    // expected types
    //  SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl
    const myTestValues: {value: string, safeType: SafeTypeEnum}[] = [
      {
        safeType: SafeTypeEnum.HTML,
        value: '<p>test</p>'
      },
      {
        value: '<style>.someClass{margin: 0}</style>',
        safeType: SafeTypeEnum.STYLE,
      },
      {
        value: 'https://www.testing.com',
        safeType: SafeTypeEnum.URL
      },
      {
        value: '<script>alert("hello world");</script>',
        safeType: SafeTypeEnum.SCRIPT
      },
      {
        value: 'some::resource.com',
        safeType: SafeTypeEnum.RESOURCE_URL
      }
      // etc, one for each
    ];

    const safePipe = new SafePipe(domSanitizer);

    myTestValues.forEach(({value, safeType}) => {
      const result: SafeHtml = safePipe.transform(value, safeType);
      expect(result).toEqual(value);
    })
  });
});
