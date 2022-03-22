import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  title = 'Aeode - Muse of voice and Song';

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

}
