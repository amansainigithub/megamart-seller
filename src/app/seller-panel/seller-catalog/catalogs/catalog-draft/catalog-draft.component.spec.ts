import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogDraftComponent } from './catalog-draft.component';

describe('CatalogDraftComponent', () => {
  let component: CatalogDraftComponent;
  let fixture: ComponentFixture<CatalogDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogDraftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
