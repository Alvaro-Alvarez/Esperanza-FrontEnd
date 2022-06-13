import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  items: any[] = [
    {
      stock: "1",
      img: "assets/test-product/product1.jpg"
    },
    {
      stock: "2",
      img: "assets/test-product/product2.jpg"
    },
    {
      stock: "3",
      img: "assets/test-product/product3.jpg"
    },
    {
      stock: "4",
      img: "assets/test-product/product4.jpg"
    },
    {
      stock: "5",
      img: "assets/test-product/product5.jpg"
    },
    {
      stock: "6",
      img: "assets/test-product/product6.jpg"
    },
    {
      stock: "7",
      img: "assets/test-product/product1.jpg"
    }
  ];

  startIndex = 0
  lastIndex = 2
  mediator = [this.items[0], this.items[1], this.items[2], this.items[3]]
  
  constructor() { }

  ngOnInit(): void {
  }

  leftClick() {
    if (this.startIndex === 0) {
      this.startIndex = this.items.length-1
      this.lastIndex--
      this.mediator.unshift(this.items[this.items.length-1])
      this.mediator.pop()
    }
    else if (this.lastIndex === 0) {
      this.lastIndex = this.items.length-1
      this.startIndex--
      this.mediator.unshift(this.items[this.startIndex])
      this.mediator.pop()
    }
    else {
      this.startIndex--
      this.lastIndex--
      this.mediator.unshift(this.items[this.startIndex])
      this.mediator.pop()
    }
    console.log('start ', this.startIndex, 'last ', this.lastIndex)
    return
  }
  
  rightClick() {
    if (this.lastIndex === this.items.length-1) {
      this.lastIndex = 0
      this.startIndex++
      this.mediator.shift()
      this.mediator.push(this.items[0])
    }
    else if (this.startIndex === this.items.length-1) {
      this.startIndex = 0
      this.lastIndex++
      this.mediator.shift()
      this.mediator.push(this.items[this.lastIndex])
    }
    else {
      this.startIndex++
      this.lastIndex++ 
      this.mediator.shift()
      this.mediator.push(this.items[this.lastIndex])
    }
    console.log('start ', this.startIndex, 'last ', this.lastIndex)
    return
  }

}
