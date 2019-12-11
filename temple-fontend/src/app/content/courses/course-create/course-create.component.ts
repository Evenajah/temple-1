import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BreadcrumbService } from '../../../shared/service/breadcrumb.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Course } from 'src/app/shared/interfaces/course';
import { formatDate, DatePipe } from '@angular/common';
import { LocationService } from '../../location/location.service';
import { CourseService } from '../shared/course.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { Teacher } from 'src/app/shared/interfaces/teacher';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  public msgs: any;
  public courses: Course[];
  public locations: Location[];
  public noticearr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public notice: Array<any> = [];
  public filteredTeacher: any[];
  public teachers: any[];
  public teacher: any;
  public pipe = new DatePipe('th-TH');
  public yearRange: string;
  @Input() displayCreateDialog = false;
  @Output() closeDisplayCreateDialog = new EventEmitter();

  courseForm = new FormGroup(
      {
        courseName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        detail: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        location: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        conditionMin: new FormControl('', Validators.required),
        teachers: new FormControl('', Validators.required),
      }
    )

  public formError = {
    courseName: '',
    detail: '',
    location: '',
    date: '',
    teachers: '',
    conditionMin: ''
  };

  public formLengthError = {
    courseName: '',
    detail: '',
    location: '',
    date: '',
    teachers: '',
    conditionMin: ''
  };

  public validationMessage = {
    courseName: {
      required: 'ชื่อคอร์ส*'
    },
    detail: {
      required: 'รายละเอียด*'
    },
    location: {
      required: 'สถานที่*'
    },
    date: {
      required: 'วันที่เรียน*'
    },
    teachers: {
      required: 'ผู้สอน*'
    },
    conditionMin: {
      required: 'หมายเหตุ*'
    }
  };
  

  constructor(
    private breadCrumbService: BreadcrumbService,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private courseService: CourseService,
    private router: Router,
    private confirmationService: ConfirmationService,
    // private memberService: MemberService,
  ) { }

  ngOnInit() {
    this.initNotice();
    this.breadCrumbService.setPath([
      { label: 'จัดการคอร์ส', routerLink: '/manageCourse' }
    ]);
    this.courseService.getTeachers().subscribe(
      res => {
        if (res.status == 'Success') {
          this.teachers = res['data'].map(res => {
            return {
              id: res.id,
              name: res.titleDisplay + res.fname + ' ' + res.lname
            }
          })
          // console.log(this.teachers);

        }
      },
      error => {
        console.log(error['error']['message']);

      }
    );

    this.locationService.getLocation().subscribe(
      res => {
        if (res.status === 'Success') {
          this.locations = res.data;
        }
      },
      error => {
        console.log(error['error']['message']);

      }
    );
    const currentYear = this.pipe.transform(Date.now(), 'yyyy');
    const startYear = parseInt(currentYear) - 100;
    this.yearRange = startYear + ':' + currentYear;
  }

  private initNotice() {
    this.noticearr.map(res => {
      this.notice.push({ id: res });
    });

  }

  /**
   * ตรวจสอบค่าที่รับเข้ามาใหม่ในกรณีกรอกข้อมูลไม่ครบถ้วน
   */
  subscribeInputMessageWaring() {
      this.courseForm
        .valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        ).subscribe(() => this.waringMessage());
        this.waringMessage();
    }

  waringMessage() {
    if (!this.formError) {
      return;
    }
      for (const field of Object.keys(this.formError)) {
        this.formError[field] = '';
        const control = this.courseForm.get(field);
        if (control && this.validationMessage[field]) {
          // console.log(field);
          // console.log(control.valid);
          if (!control.valid) {
            this.formError[field] = this.validationMessage[field].required;
            if (field == 'courseName') {
              if (control.hasError('maxlength')) {
                // console.log('if' + field);
                this.formLengthError[field] = '**ข้อความต้องน้อยกว่า 255 ตัวอักษร';
              }
            }
            if (field == 'detail' ){
              if (control.hasError('maxlength')) {
                // console.log('if' + field);
                this.formLengthError[field] = '**ข้อความต้องน้อยกว่า 255 ตัวอักษร';
              }
            }
          }else{
            this.formLengthError[field] = '';
          }
        }
      }
  }

  onSubmit() {
    this.setValidate();
    if (!this.courseForm.valid ) {
        this.subscribeInputMessageWaring();
    } else {
      this.confirmationService.confirm({
        message: 'ยืนยันการสร้างคอร์ส',
        header: 'สร้างคอร์สใหม่',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const date = this.courseForm.get('date').value;
          // console.log('dateForm0 =' + date[0]);
          // console.log('dateForm1 =' + date[1]);
          const stDate = formatDate(date[0], 'yyyy-MM-dd', 'en');
          let endDate = '';
          let datesort = [];
          if (date[1] != null) {
            endDate = formatDate(date[1], 'yyyy-MM-dd', 'en');
            datesort = date.map(res => formatDate(res, 'yyyy-MM-dd', 'en')).sort();
          } else {
            endDate = stDate;
            for (let i = 0 ; i < 2; i++) {
              datesort.push(stDate);
            }
          }
          // console.log('stDate =' + stDate);
          // console.log('endDate =' + endDate);
          // console.log('datesort =' + datesort);
          // console.log('TEACHERS =' + this.courseForm.get('teachers').value.map(res => res.id));
          const course = {
            no: 0,
            name: this.courseForm.get('courseName').value,
            detail: this.courseForm.get('detail').value,
            locationId: this.courseForm.get('location').value.id,
            conditionMin: this.courseForm.get('conditionMin').value.id,
            date: datesort,
            stDate: stDate,
            endDate: endDate,
            status: 1,
            teacher: this.courseForm.get('teachers').value.map(res => res.id)
          };
          // console.log(course);
  
          this.courseService.createCourse(course).subscribe(res => {
            if (res['result'] === 'Success') {
              /* const index = this.courses.findIndex(course => course.id === this.courseId);
              const upd = this.courses[index];
              upd.status = 'รอการอนุมัติ';
              upd.saStatus = '2';
              upd.canRegister = 0;
              this.updateTable([
                ...this.courses.slice(0, index),
                upd,
                ...this.courses.slice(index + 1)
              ]); */
              this.msgs = [{ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ดำเนินการสร้างคอร์สสำเร็จ' }];
              this.onCancle(this.msgs);
            } else if (res['result'] === 'Fail') {
              this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: res['errorMessage'] }];
              this.onCancle(this.msgs);
            }
          });
        },
        reject: () => {
          this.msgs = [{severity: 'info', summary: 'ข้อความจากระบบ', detail: 'ยกเลิกการสร้างคอร์ส'}];
          this.onCancle(this.msgs);
        }
      });  
    }
  }

  private updateTable(data: any[]) {
    this.courses = data;
  }

  /**
   * autosearch ของผู้สอน
   */
  filterTeacherMultiple(event) {
    let query = event.query;
    this.filteredTeacher = this.filterTeacher(query, this.teachers);
    // console.log(this.filteredTeacher);
    
  }

  filterTeacher(query, teachers: any): any[] {   
    let filtered: any[] = [];
    for (let i = 0; i < teachers.length; i++) {
      let teacher = teachers[i]
      if ((teacher.name).toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(teacher);
      }
    }
    return filtered;
  }

  onCancle(message) {
    this.closeDisplayCreateDialog.emit(message);
    this.courseForm.reset();
        Object.values(this.courseForm.controls).forEach(df => {
          df.markAsPristine();
          df.setValidators(null);
          df.updateValueAndValidity();
        });
  }

  setValidate() {
      Object.keys(this.courseForm.controls).forEach(key => {
        const control = this.courseForm.get(key);
        control.clearValidators();
        if (key == 'courseName' || key == 'detail') {
          control.setValidators([Validators.required, Validators.maxLength(255)]);
        } else {
          control.setValidators(Validators.required);
        }
        control.updateValueAndValidity();
      });
}

}