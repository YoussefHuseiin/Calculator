import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'frontCalc';

  currentInput: string = '0';
  previousInput: string = '0';
  link: string = 'http://localhost:8090/binary/'
  resultApplied: boolean = false;
  Error: boolean = false;

pushNum(unit: string){
  if(this.currentInput.length > 19) return;
  if(this.resultApplied) 
    {this.clear('C'); this.resultApplied = false;
     this.Error = false;
  }
  if(unit == '.'){
    if(this.currentInput.toString().lastIndexOf(".")<0)
    this.currentInput += '.';
  }
  else{
    if(this.currentInput == '0')
      this.currentInput = '';
    this.currentInput += unit;
  }
}

extractNum(input: string){
  return input.substring(0,input.length-1)
}

pushBinaryOp(op: string){
  if(this.Error){
    this.Error=false;
    this.currentInput = '0';            
  }
  if(this.previousInput == '0'){
    this.previousInput = this.currentInput+op;
    this.currentInput = '0';
  }
  else{
    if(this.currentInput == '0'){
      this.previousInput = this.extractNum(this.previousInput)+op;
    }
    else{
      const temp = this.previousInput;
      this.previousInput = op;
      this.solve(this.extractNum(temp),this.currentInput,
      temp.charAt(temp.length-1), true, false);
    }
  }
  this.resultApplied = false;
}

pushUnaryOp(op: string){
  if(this.Error){
    this.Error= true;
    this.currentInput = '0'
    return;
  }
  switch(op){
    case'+-':
      this.solve(this.currentInput,-1+'','*',false,false);
      break;
    case'sqrt':
      this.solve(this.currentInput,'0.5','^',false,false);
      break;
    case'square':
      this.solve(this.currentInput,'2','^',false,false);
      break;
    case'inv':
      this.solve('1.0',this.currentInput,'div',false,false);
      break;
    case'percent':
      this.solve(this.currentInput,'0','percent',false,false);
  }
  this.resultApplied = true;
}

clear(op: string){
  switch(op){
    case'C':
      this.previousInput = '0';
      this.currentInput = '0';
      break
    case'CE':
      this.currentInput = '0';
      break;
    default:
        if(this.currentInput.length == 1)
            this.currentInput = '0';
        else{
            this.currentInput = this.extractNum(this.currentInput)
        }
  }
}

equal(){
  const op = this.previousInput.charAt(this.previousInput.length-1);
  this.solve(this.extractNum(this.previousInput),this.currentInput,op,false,true);
  this.previousInput = '0';
}

solve(first:string, second:string, op:string, update:boolean,equal: boolean){
  if(op == '/') op = 'div';
  fetch(this.link+first+'/'+second+'/'+op,{
    method:'GET',
    headers:{
        'Accept':'application/json',
        'mode':'no-cors'
    }
})
.then((response) => response.text())
.then((data) => {
  if(data== 'Error'){
    this.previousInput = '0';
    this.currentInput = 'Error';
    this.resultApplied = true;
    this.Error = true;
  } else {
  if(!update){
    if(data != 'Error')
      this.currentInput=data}
  else if(update){
    this.previousInput = data + this.previousInput.charAt(0);
    this.currentInput = '0';
  }
  else if(equal){
    this.currentInput = data;
    this.resultApplied = true; }
  }
});
}

}
