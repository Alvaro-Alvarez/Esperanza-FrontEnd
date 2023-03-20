import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cross-selling',
  templateUrl: './cross-selling.component.html',
  styleUrls: ['./cross-selling.component.scss']
})
export class CrossSellingComponent implements OnInit {

  items: any[] = [
    {
      stock: "1",
      img: "https://placeimg.com/350/150/any"
    },
    {
      stock: "2",
      img: "https://placeimg.com/350/150/any/sepia"
    },
    {
      stock: "3",
      img: "https://placeimg.com/350/150/any/grayscale"
    },
    {
      stock: "4",
      img: "https://placeimg.com/350/150/tech/grayscale"
    },
    {
      stock: "5",
      img: "https://placeimg.com/350/150/people"
    },
    {
      stock: "6",
      img: "https://placeimg.com/350/150/nature"
    },
    {
      stock: "7",
      img: "https://placeimg.com/350/150/arch"
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
    // console.log('start ', this.startIndex, 'last ', this.lastIndex)
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
    // console.log('start ', this.startIndex, 'last ', this.lastIndex)
    return
  }

}
