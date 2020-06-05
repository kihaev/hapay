import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchModeEnum } from '../shared/enums';
import * as moment from 'moment'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  // private _onDestroy = new Subject<void>();
  // public excursions: GetAllServicesViewModel = new GetAllServicesViewModel();
  // public transfers: GetAllServicesViewModel = new GetAllServicesViewModel();
  // public accommodations: GetAllServicesViewModel = new GetAllServicesViewModel();
  // @Input() public searchMode: SearchModeEnum = 1

  // public searchedExcursions: Array<SearchedExcursionViewModel>
  // public searchedTransfers: Array<SearchedTransferViewModel>

  // slides = [
  //   { img: "/assets/img/home/place-1.jpg" },
  //   { img: "/assets/img/home/place-2.jpg" },
  //   { img: "/assets/img/home/place-3.jpg" },
  //   { img: "/assets/img/home/place-4.jpg" },
  //   { img: "http://placehold.it/350x150/777777" },
  //   { img: "http://placehold.it/350x150/888888" }
  // ];
  // public slideConfig = {
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   nextArrow:
  //     '<button class="right-arrow name="right-arrow"" aria-label="Next apartment"></button>',
  //   prevArrow:
  //     '<button class="left-arrow" name="left-arrow" aria-label="Previous apartment"></button>',
  //   responsive: [
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //       }
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2
  //       }
  //     },
  //     {
  //       breakpoint: 580,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerMode: true,
  //         centerPadding: '16px',
  //       }
  //     }
  //   ]
  // };

  // constructor(
  //   private route: ActivatedRoute,
  //   private readonly transferSvc: TransferService,
  //   private readonly excursionService: ExcursionService,
  //   private readonly accommodationService: AccommodationService,
  //   private readonly globalSharingSvc: GlobalSharingService,
  //   private readonly excursionCookieSvc: ExcursionCartCookieService,
  //   private readonly transferCookieSvc: TransferCartCookieService) { }

  // ngOnInit() {
  //   // this.route.paramMap.subscribe(params => {
  //   //   this.searchMode = +params.get('searchMode')
  //   // })
  //   let today: Date = new Date()
  //   let excursionSearchOptions: SearchExcursionDto = {
  //     locationFromId: 2,
  //     locationToId: 3,
  //     pickUpDate: moment(today).add(2, 'weeks').toDate(),
  //     paxCount: 2,
  //     childAges: []
  //   }
  //   let transferSearchOptions: SearchTransferDto = {
  //     locationFromId: 2,
  //     locationToId: 3,
  //     transportModeId: 0,
  //     pickUpDate: moment(today).add(2, 'weeks').toDate(),
  //     paxCount: 2,
  //     childAges: []
  //   }

  //   this.findExcursion(excursionSearchOptions)
  //   this.findTransfer(transferSearchOptions)
  // }

  // excursionLocationDataChanged(val: ExcursionCartLocationsViewModel) {
  //   this.excursionCookieSvc.setLocationData(val)
  // }

  // transferLocationDataChanged(val: TransferCartLocationsViewModel) {
  //   this.transferCookieSvc.setLocationData(val)
  // }

  // findExcursion(val: SearchExcursionDto) {
  //   this.excursionService.searchExcursions(val).subscribe(data => {
  //     this.searchedExcursions = data
  //     if (!this.searchedExcursions || this.searchedExcursions.length == 0) {
  //       // alert('No Excursion Available!')
  //     }
  //   })

  //   this.excursionCookieSvc.setSearchOptionData(val)
  // }

  // findTransfer(val: SearchTransferDto) {
  //   this.transferSvc.searchTransfers(val).subscribe(data => {
  //     this.searchedTransfers = data
  //     if (!this.searchedTransfers || this.searchedTransfers.length == 0) {
  //       // alert('No Transfer Available!')
  //     }
  //   })

  //   this.transferCookieSvc.setSearchOptionData(val)
  // }

  // isExcursionShown() {
  //   return this.searchMode == SearchModeEnum.Excursions
  // }

  // isTransferShown() {
  //   return this.searchMode == SearchModeEnum.Transfers
  // }

  // ngOnDestroy() {
  //   this._onDestroy.next();
  //   this._onDestroy.complete();
  // }

}
