
function findSumPair(sum, sorted_num_list, begin = 0) {
    function contains(e, start = 0, end = undefined){   
        function binary_search(l,r) {
            if (l >= r)
                return false;
            var m = Math.floor((l + r) / 2)
            var v = sorted_num_list[m]
            // console.log(`At ${m}, is ${v} = ${e}?`);
            if (v == e)
                return true;
            else if (v > e)
                return binary_search(l,m);
            else 
                return binary_search(m+1,r);
        }
        return binary_search(start, (typeof end !== 'undefined') ? end : sorted_num_list.length )
    }

    for(var i = begin; i < sorted_num_list.length; i++) {


        if (contains(sum - sorted_num_list[i], i+1))
        {
            var x = sorted_num_list[i]
            return [x, sum- x]
        }
        
    }
    return null

}

module.exports = {
    findSumPair: findSumPair
 }