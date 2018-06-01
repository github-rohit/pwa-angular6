import { CategoryService } from './../../services/category.service';
import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category[];
  constructor(private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.categoryService.getAll().subscribe((category) => {
      this.category = category;
    });
  }

}
