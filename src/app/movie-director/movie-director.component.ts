/**
 * The MovieDirectorComponent is used to render information about the directors.
 * @module MovieDirectorComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss'],
})
/**
 *
 * @param data
 */
export class MovieDirectorComponent implements OnInit {

  Director: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: {Director: any }) {}

  ngOnInit(): void {
    this.Director = this.data.Director
    console.log(this.Director);
  }
}