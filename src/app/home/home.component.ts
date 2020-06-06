import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader : Leader;
  constructor(private DishService: DishService, 
    private PromtionSevice : PromotionService,
    private LeaderService : LeaderService) { }

  ngOnInit() {
    this.dish = this.DishService.getFeaturedDish();
    this.promotion = this.PromtionSevice.getFeaturedPromotion();
    this.leader = this.LeaderService.getFeaturedLeader();
  }

}
