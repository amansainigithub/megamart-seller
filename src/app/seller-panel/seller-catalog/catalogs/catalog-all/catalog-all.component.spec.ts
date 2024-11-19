import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogAllComponent } from './catalog-all.component';

describe('CatalogAllComponent', () => {
  let component: CatalogAllComponent;
  let fixture: ComponentFixture<CatalogAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
