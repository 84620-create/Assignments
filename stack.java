public class stack {
    private int top = -1;
    private int size = 100;
    private int st[] = new int[size];

    private boolean isEmpty(){
        return (top < 0);
    }
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
    private int pop(){
        int x = st[top];
        top--;
        return x;
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
        s.isEmpty();
    }
}
