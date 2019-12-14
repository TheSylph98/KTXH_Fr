var PickList = {}

function quick_Sort(origArray) {
	if (origArray.length <= 1) { 
		return origArray;
	} else {

		var left = [];
		var right = [];
		var newArray = [];
		var pivot = origArray.pop();
		var length = origArray.length;

		for (var i = 0; i < length; i++) {
			if (origArray[i] <= pivot) {
				left.push(origArray[i]);
			} else {
				right.push(origArray[i]);
			}
		}

		return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
	}
}

let iterativeFunction = function (arr, x) { 
   
    let start=0, end=arr.length-1; 
          
    // Iterate while start not meets end 
    while (start<=end){ 
  
        // Find the mid index 
        let mid=Math.floor((start + end)/2); 
   
        // If element is present at mid, return True 
        if (arr[mid]===x) return true; 
  
        // Else look in left or right half accordingly 
        else if (arr[mid] < x)  
             start = mid + 1; 
        else
             end = mid - 1; 
    } 
   
    return false; 
} 

PickList.fillterList = function(s1, s2) {
    var pick = {}
    s1 = quick_Sort(s1)
    length1 = s1.length
    s2= quick_Sort(s2)
    length2 = s2.length
    let delete_list = []  // delete_list
    let update_list = []
    for (var i=0; i< length1; i++){
        if(!iterativeFunction(s2,s1[i])){
            delete_list.push(s1[i])
        }
    }

    for (var j=0; j < length2; j++ ) {
        if(!iterativeFunction(s1,s2[j])){
            update_list.push(s2[j])
        }
    }

    pick.deleteList = delete_list;
    pick.updateList = update_list; 

    return pick
} 

module.exports = PickList
