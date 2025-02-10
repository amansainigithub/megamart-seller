import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappedSampleFilesComponent } from './mapped-sample-files.component';

describe('MappedSampleFilesComponent', () => {
  let component: MappedSampleFilesComponent;
  let fixture: ComponentFixture<MappedSampleFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MappedSampleFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MappedSampleFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
