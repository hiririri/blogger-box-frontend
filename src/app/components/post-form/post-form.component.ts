import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../service/CategoryService';
import { Category } from '../../data/category';
import { PostCreateInput } from '../../data/post';
import { Router } from '@angular/router';
import { PostService } from '../../service/PostService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  categories!: Category[];
  postCreateInput!: PostCreateInput;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService,
  ) {}

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(255),
          ],
        },
      ],
      content: [
        '',
        {
          validators: [Validators.required, Validators.maxLength(2500)],
        },
      ],
      category: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });
    this.categoryService
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.postCreateInput = {
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        categoryId: this.postForm.value.category,
      };
      this.postService
        .createPost(this.postCreateInput)
        .subscribe(() =>
          this.router.navigate(['/']).then((r) => console.log(r)),
        );
      this.showToast('success', 'Post submitted successfully');
    } else {
      this.markFormGroupTouched(this.postForm);
      this.showToast('error', 'Please review your post.');
    }
  }

  onCancel() {
    this.router.navigate(['/']).then((r) => console.log(r));
  }

  get title() {
    return this.postForm.controls['title'];
  }

  get content() {
    return this.postForm.controls['content'];
  }

  get category() {
    return this.postForm.controls['category'];
  }

  private showToast(
    icon: 'success' | 'error' | 'warning' | 'info' | 'question',
    title: string,
  ) {
    let toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    toast
      .fire({
        icon: icon,
        title: title,
      })
      .then((r) => console.log(r));
  }

  private markFormGroupTouched(postForm: FormGroup) {
    Object.values(postForm.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
