import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DISHES } from '../shared/dishes';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
@Component({
	selector: 'app-dishdetail',
	templateUrl: './dishdetail.component.html',
	styleUrls: [ './dishdetail.component.scss' ]
})
export class DishdetailComponent implements OnInit {
	dish: Dish;
	dishIds: string[];
	prev: string;
	next: string;
	ratingform: FormGroup;
	comment: Comment;
	@ViewChild('fform') ratingFormDirective;

	formErrors = {
		author: '',
		comment: ''
	};

	validationMessages = {
		author:
			{
				required: 'Name is required.',
				minlength: 'Name must be at least 2 characters long.'
			},
		comment:
			{
				required: 'Comment  is required.'
			}
	};

	constructor(
		private dishservice: DishService,
		private route: ActivatedRoute,
		private location: Location,
		private fb: FormBuilder,
		@Inject('BaseURL') private BaseURL
	) {
		this.createForm();
	}

	ngOnInit() {
		this.dishservice.getDishIds().subscribe((dishIds) => (this.dishIds = dishIds));
		this.route.params
			.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
			.subscribe((dish) => {
				this.dish = dish;
				this.setPrevNext(dish.id);
			});
	}

	setPrevNext(dishId: string) {
		const index = this.dishIds.indexOf(dishId);
		this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
		this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
	}

	goBack() {
		this.location.back();
	}

	createForm(): void {
		this.ratingform = this.fb.group({
			rating: [ 5 ],
			comment: [ '', Validators.required ],
			author: [ '', [ Validators.required, Validators.minLength(2) ] ],
			date: [ Date.now() ]
		});

		this.ratingform.valueChanges.subscribe((data) => this.onValueChanged(data));

		this.onValueChanged();
	}

	onValueChanged(data?: any) {
		if (!this.ratingform) {
			return;
		}
		const form = this.ratingform;
		for (const field in this.formErrors) {
			if (this.formErrors.hasOwnProperty(field)) {
				// clear previous error message (if any)
				this.formErrors[field] = '';
				const control = form.get(field);
				if (control && control.dirty && !control.valid) {
					const messages = this.validationMessages[field];
					for (const key in control.errors) {
						if (control.errors.hasOwnProperty(key)) {
							this.formErrors[field] += messages[key] + ' ';
						}
					}
				}
			}
		}
	}

	onSubmit() {
		this.comment = this.ratingform.value;
		console.log(this.comment);
		this.ratingform.reset({
			rating: 5,
			comment: '',
			author: '',
			date: Date.now()
		});
		this.ratingFormDirective.resetForm();
	}
}
