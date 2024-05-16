import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../service/CategoryService";
import {Category} from "../../data/category";
import {Post, PostCreateInput} from "../../data/post";
import {Router} from "@angular/router";
import {PostService} from "../../service/PostService";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  categories!: Category[];
  post!: PostCreateInput;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService
  ) {
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(255),
          ]
        }
      ],
      content: [
        '',
        {
          validators: [
            Validators.required,
            Validators.maxLength(2500),
          ]
        }
      ],
      category: [
        '',
        {
          validators: [
            Validators.required,
          ]
        }
      ]
    });
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  onSubmit() {
    if (this.postForm.valid) {
      console.log(this.categories);
      console.log(this.postForm);
      this.post = {
        title: this.postForm.value.title,
        content:this.postForm.value.content,
        categoryId: this.postForm.value.category
      }
      console.log(this.post);
      this.postService.createPost(this.post).subscribe(() => this.router.navigate(['/']).then(r => console.log(r)));
    }
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
}
