import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogProgressComponent } from './catalog-progress.component';

describe('CatalogProgressComponent', () => {
  let component: CatalogProgressComponent;
  let fixture: ComponentFixture<CatalogProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
