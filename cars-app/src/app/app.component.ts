import { Component, HostListener } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  });

  carsData: any;

  // carsData = [
  //   {
  //     image: "1.png",
  //     name: "Lamborghini Huracan Spyder",
  //     gear: "Полный",
  //     engine: 5.2,
  //     places: 2,
  //     transmission: "автомат"
  //   },
  //   {
  //     image: "2.png",
  //     name: "Chevrolet Corvette",
  //     gear: "Полный",
  //     engine: 6.2,
  //     places: 2,
  //     transmission: "автомат"
  //   },
  //   {
  //     image: "3.png",
  //     name: "Ferrari California",
  //     gear: "Полный",
  //     engine: 3.9,
  //     places: 4,
  //     transmission: "автомат"
  //   },
  //   {
  //     image: "4.png",
  //     name: "Lamborghini Urus",
  //     gear: "Полный",
  //     engine: 4.0,
  //     places: 5,
  //     transmission: "автомат"
  //   },
  //   {
  //     image: "5.png",
  //     name: "Audi R8",
  //     gear: "Полный",
  //     engine: 5.2,
  //     places: 2,
  //     transmission: "автомат"
  //   },
  //   {
  //     image: "6.png",
  //     name: "Chevrolet Camaro",
  //     gear: "Полный",
  //     engine: 2.0,
  //     places: 4,
  //     transmission: "автомат"
  //   },
  //   {
  //     image: "7.png",
  //     name: "Maserati Quattroporte",
  //     gear: "Полный",
  //     engine: 3.5,
  //     places: 4,
  //     transmission: "автомат"
  //   },
  //   {
  //     image: "8.png",
  //     name: "Dodge Challenger",
  //     gear: "Полный",
  //     engine: 4.0,
  //     places: 2,
  //     transmission: "автомат"
  //   },
  //   {
  //     image: "9.png",
  //     name: "Nissan GT-R",
  //     gear: "Полный",
  //     engine: 5.0,
  //     places: 2,
  //     transmission: "автомат"
  //   },
  // ];

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getData(this.category).subscribe(carsData => this.carsData = carsData);
  }

  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({ behavior: "smooth" });
    if (car) {
      this.priceForm.patchValue({ car: car.name });
    }
  }

  category: string = 'sport';
  toggleCategory(category: string) {
    this.category = category;
    this.ngOnInit();
  }

  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = { transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)' };
  }

  bgPos: any;
  @HostListener('document:scroll', ['$event'])

  onScroll() {
    this.bgPos = { backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px' };
  }

  onSubmit() {
    if (this.priceForm.valid) {

      this.appService.sendQuery(this.priceForm.value)
        .subscribe(
          {
            next: (response: any) => {
              alert(response.message);
              this.priceForm.reset();
            },
            error: (response) => {
              alert(response.error.message);
            }
          }
        );
    }
  }
}
