/**
 * The MovieDescriptionComponent is used to render the movie description.
 * @module MovieDescriptionComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss'],
})
export class MovieDescriptionComponent implements OnInit {
  Description: any;

  /**
   *
   * @param data
   */
  constructor(@Inject(MAT_DIALOG_DATA) private data: { Description: any }) {}

  ngOnInit(): void {
  this.Description = this.data.Description
  console.log(this.Description)
  }

}