public class LinkedList {
    Node head;
    static class Node{
        private int data;
        private Node next;
        
        Node(int data){
            this.data=data;
            this.next=null;
        }
        
        public void setNext(Node next){
            this.next = next;
        }
        
        public Node getNext(){
            return this.next;
        }
        
        public int getData(){
            return this.data;
        }
    }

    public static LinkedList addElement(LinkedList mylist, int data){
        Node new_Node = new Node(data);
        new_Node.next = null;

        if(mylist.head == null){
            mylist.head = new_Node;
        }else{
            Node last = mylist.head;
            while(last.next != null){
                last = last.next;
            }
            last.next = new_Node;
        }
        return mylist;
    }
    public static LinkedList deleteByKey(LinkedList mylist,int index){
        System.out.println();
        Node currNode = mylist.head, prev = null; 
        if (currNode != null && currNode.data == index) {
        mylist.head = currNode.next; 
        System.out.println(index + " deleted");

        return mylist;
        }
        while (currNode != null && currNode.data != index) {
            prev = currNode;
            currNode = currNode.next;
        }
        if (currNode != null) {
        prev.next = currNode.next;
            System.out.println(index + " deleted");
        }
        if (currNode == null) {
            System.out.println(index + " not found");
        }
        return mylist;
    }
    public static void printMyList(LinkedList mylist){
        Node curr = mylist.head;
        System.out.print("LinkedMyList : ");
        while(curr != null){
            System.out.print(curr.data + " ");
            curr = curr.next;
        }
    }
    public static void main(String args[]){
        LinkedList mylist = new LinkedList();

        mylist = addElement(mylist,1);
        mylist = addElement(mylist,2);
        mylist = addElement(mylist,3);
        mylist = addElement(mylist,4);
        mylist = addElement(mylist,5);
        mylist = addElement(mylist,6);
        mylist = addElement(mylist,7);
        printMyList(mylist);
        mylist = deleteByKey(mylist,1);
        printMyList(mylist);

    }
}

