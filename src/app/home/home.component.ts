import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ],
	host: {
		'[@flyInOut]': 'true',
		'style': 'display: block;'
	},
	animations: [
		flyInOut(),
		expand()
	]
})
export class HomeComponent implements OnInit {
	dish: Dish;
	promotion: Promotion;
  leader: Leader;
  disherrMess: string;
	constructor(
		private DishService: DishService,
		private PromtionSevice: PromotionService,
		private LeaderService: LeaderService,
		@Inject('BaseURL') private BaseURL
	) {}

	ngOnInit() {
		this.DishService.getFeaturedDish().subscribe((dish) => (this.dish = dish), errmess => this.disherrMess = <any> errmess);
		this.PromtionSevice.getFeaturedPromotion().subscribe((promotion) => (this.promotion = promotion));
		this.LeaderService.getFeaturedLeader().subscribe((leader) => (this.leader = leader));
	}
}
