function ListNode(val) {
    this.val = val;
    this.next = null;
  }
  
  function addTwoNumbers(l1, l2) {
    let dummyHead = new ListNode(0);
    let current = dummyHead;
    let carry = 0;
  
    while (l1 !== null || l2 !== null) {
      let sum = carry;
  
      if (l1 !== null) {
        sum += l1.val;
        l1 = l1.next;
      }
  
      if (l2 !== null) {
        sum += l2.val;
        l2 = l2.next;
      }
  
      carry = Math.floor(sum / 10);
      current.next = new ListNode(sum % 10);
      current = current.next;
    }
  
    if (carry > 0) {
      current.next = new ListNode(carry);
    }
  
    return dummyHead.next;
  }
  
  // Test case
  let l1 = new ListNode(2);
  l1.next = new ListNode(4);
  l1.next.next = new ListNode(3);
  
  let l2 = new ListNode(5);
  l2.next = new ListNode(6);
  l2.next.next = new ListNode(4);
  
  let result = addTwoNumbers(l1, l2);
  
  // Print the result
  let output = '';
  while (result !== null) {
    output += result.val + ' -> ';
    result = result.next;
  }
  output = output.slice(0, -4); // Remove the extra ' -> ' at the end
  console.log(output); // Output: 7 -> 0 -> 8