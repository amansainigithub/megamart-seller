import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPassComponent } from './catalog-pass.component';

describe('CatalogPassComponent', () => {
  let component: CatalogPassComponent;
  let fixture: ComponentFixture<CatalogPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogPassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
