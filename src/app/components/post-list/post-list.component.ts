import { Component, OnInit } from '@angular/core';
import { Post } from '../../data/post';
import { PostService } from '../../service/PostService';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts.map(post => {
        let dateParts = post.createdDate.toString().split(',').map(part => parseInt(part, 10));
        post.createdDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4], dateParts[5]);
        return post;
      });
    });
  }
}
