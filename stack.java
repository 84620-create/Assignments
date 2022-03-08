public class stack {
    private int top = -1;
    private int size = 100;
    private int st[] = new int[size];

    private void top(){
        if(top >= 0)
            System.out.println("Value at the top of Stack : " + st[top]);
    }
    private boolean push(int value){
        if(top < size){
            st[++top] = value;
            return true;
        }else{
            return false;
        }
    }
    private void isStackOverflow(){
        if(top >= 100){
            System.out.println("Stack overflow.....");
        }else{
            System.out.println("Stack not in overflow.....");
        }
    }
  
    private void isStackUnderflow(){
          if(top == -1){
            System.out.println("Stack underflow.....");
          }else{
            System.out.println("Stack not in underflow.....");
          } 
      }
    private void pop(){
        if(top == -1){
            System.out.println("Stack underflow.....");

        }else{
            System.out.println("poped element : " + st[top--]);
        }
    }
    private void display(){
        if(top < 0 ){
            System.out.println("Stack underflow.....");
        }else{
            System.out.println("Stack.....");
            for(int i = top; i>= 0; i--){
                System.out.println(st[i] + " ");
            }
        }
    }
    public static void main(String args[]){
        stack s = new stack();
        s.push(5);
        s.push(45);
        s.push(15);
        s.pop();
        s.push(94);
        s.display();
        s.top();
        s.isStackUnderflow();
        s.isStackOverflow();
    }
}
