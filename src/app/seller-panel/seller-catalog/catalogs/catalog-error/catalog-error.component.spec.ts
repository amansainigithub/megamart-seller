import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogErrorComponent } from './catalog-error.component';

describe('CatalogErrorComponent', () => {
  let component: CatalogErrorComponent;
  let fixture: ComponentFixture<CatalogErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
