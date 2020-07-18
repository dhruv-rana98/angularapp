import { Component, OnInit, ViewChild } from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut, expand, visibility } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: [ './contact.component.scss' ],
	host:
		{
			'[@flyInOut]': 'true',
			style: 'display: block;'
		},
	animations: [ flyInOut(), expand(), visibility() ]
})
export class ContactComponent implements OnInit {
	feedbackForm: FormGroup;
	feedback: Feedback;
	feedbackstatus: Feedback;
	feedbackcopy: Feedback;
	errmess: string;
	contactType = ContactType;
	@ViewChild('fform') feedbackFormDirective;

	formErrors = {
		firstname: '',
		lastname: '',
		telnum: '',
		email: ''
	};

	validationMessages = {
		firstname:
			{
				required: 'First Name is required.',
				minlength: 'First Name must be at least 2 characters long.',
				maxlength: 'FirstName cannot be more than 25 characters long.'
			},
		lastname:
			{
				required: 'Last Name is required.',
				minlength: 'Last Name must be at least 2 characters long.',
				maxlength: 'Last Name cannot be more than 25 characters long.'
			},
		telnum:
			{
				required: 'Tel. number is required.',
				pattern: 'Tel. number must contain only numbers.'
			},
		email:
			{
				required: 'Email is required.',
				email: 'Email not in valid format.'
			}
	};

	constructor(private fb: FormBuilder, private sf: FeedbackService) {
		this.createForm();
	}

	ngOnInit() {}

	createForm(): void {
		this.feedbackForm = this.fb.group({
			firstname: [ '', [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ] ],
			lastname: [ '', [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ] ],
			telnum: [ '', [ Validators.required, Validators.pattern ] ],
			email: [ '', [ Validators.required, Validators.email ] ],
			agree: false,
			contactType: 'None',
			message: ''
		});

		this.feedbackForm.valueChanges.subscribe((data) => this.onValueChanged(data));

		this.onValueChanged(); //Reset the Form validation message
	}

	onValueChanged(data?: any) {
		if (!this.feedbackForm) {
			return;
		}
		const form = this.feedbackForm;
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
		this.feedback = this.feedbackForm.value;
		console.log(this.feedback);
		this.feedbackstatus = this.feedback;
		setTimeout(() => {
			this.sf.submitFeedback(this.feedback).subscribe(
				(feed) => {
					this.feedback = feed;
					this.feedbackcopy = feed;
					this.feedbackstatus = null;
				},
				(errmess) => {
					this.feedback = null;
					this.feedbackcopy = null;
					this.feedbackstatus = null;
					this.errmess = <any>errmess;
				}
			);
		}, 2000);
		// this.sf.submitFeedback(this.feedbackcopy).subscribe(
		// 	(feed) => {
		// 		this.feedback = feed;
		// 		this.feedbackcopy = feed;
		// 	},
		// 	(errmess) => {
		// 		this.feedback = null;
		// 		this.feedbackcopy = null;
		// 		this.errmess = <any>errmess;
		// 	}
		// );
		setTimeout(() => {
			this.feedbackForm.reset({
				firstname: '',
				lastname: '',
				telnum: 0,
				email: '',
				agree: false,
				contactType: 'None',
				message: ''
			});
			this.feedbackFormDirective.resetForm();
			this.feedbackcopy = null;
		}, 7000);
		// this.feedbackForm.reset({
		// 	firstname: '',
		// 	lastname: '',
		// 	telnum: 0,
		// 	email: '',
		// 	agree: false,
		// 	contactType: 'None',
		// 	message: ''
		// });
		// this.feedbackFormDirective.resetForm();
	}
}
