import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../data/post";

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent {
  @Input() post!: Post;

  constructor() {
  }
}
