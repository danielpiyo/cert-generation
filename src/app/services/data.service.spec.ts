import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { verificationPaylod } from '../models/user.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSingleDetails should send a GET request and return a single item', (done) => {
    service.getDataLogin({ user_email: 'test@test.com' }).subscribe(
      (item: any) => {
        expect(item).toBeDefined();
        done();
      },
      (error) => {
        fail(error.message);
      }
    );

    const testRequest = httpMock.expectOne(
      'http://207.180.243.185:4000/api/cert/verify'
    );
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush({
      user_name: 'pet',
      user_email: 'pet@example.com',
      status: 'Test',
      date: '2023-05-18',
    });
  });

  it('createTodo should send a POST request and return the newly created item', (done) => {
    const dataToVerify: verificationPaylod = {
      user_email: 'test@test.com',
    };

    service.validateUserData(dataToVerify).subscribe(
      (data: any) => {
        expect(data).toBeDefined();
        // expect(data).toEqual(item);
        done();
      },
      (error) => {
        fail(error.message);
      }
    );

    const testRequest = httpMock.expectOne('http://207.180.243.185:4000/api/');
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(dataToVerify);
  });
});
