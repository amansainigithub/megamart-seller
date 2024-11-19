import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsAreaComponent } from './catalogs-area.component';

describe('CatalogsAreaComponent', () => {
  let component: CatalogsAreaComponent;
  let fixture: ComponentFixture<CatalogsAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogsAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
