import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Masons Tours';

  constructor(
    private router: Router,
    private titleService: Title) {
    this.subscribeToRouteChanges();
  }

  private subscribeToRouteChanges(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((x: any) => {
        this.setPageTitle();
        this.scrollToTopOfPage();
      });
  }

  private scrollToTopOfPage(): void {
    if (window) {
      window.scrollTo(0, 0);
    }
  }

  private setPageTitle(): void {
    let title = this.getTitle(
      this.router.routerState,
      this.router.routerState.root
    ).join("-");

    this.titleService.setTitle(title);
  }

  private getTitle(state, parent): string[] {
    let data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
