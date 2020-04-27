import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { TestBed, async } from '@angular/core/testing';
import { ActionSheetController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MoviesPage } from './movies';
//import { ConferenceData } from '../../providers/conference-data';

const confDataSub = {};

describe('MoviesPage', () => {
  let fixture, app;
  beforeEach(async(() => {
    const actionSheetSpy = jasmine.createSpyObj('ActionSheetController', [
      'create'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const iabSpy = jasmine.createSpyObj('InAppBrowser', ['create']);

    TestBed.configureTestingModule({
      declarations: [MoviesPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActionSheetController, useValue: actionSheetSpy },
        { provide: InAppBrowser, useValue: iabSpy },
        { provide: Router, useValue: routerSpy }
//        { provide: ConferenceData, useValue: confDataSub }
      ]
    }).compileComponents();

  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesPage);
    app = fixture.debugElement.componentInstance;
  });
  it('should create the speaker list page', () => {
    expect(app).toBeTruthy();
  });
});
