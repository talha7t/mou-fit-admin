export const getUniqueArray = (arr, objKey) => {

    let uniqueArrWithObjs = [...new Map(arr.map((item) => [item[objKey ?? 'id'], item])).values()]
    // console.log("uniqueArrWithObjs =>", uniqueArrWithObjs);
    return uniqueArrWithObjs
};

export const arrayMove = (array, oldIndex, newIndex) => {
    if (newIndex >= array.length) {
        let k = newIndex - array.length;
        while (k-- + 1) {
            array.push(undefined);
        }
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);

    // Update the index property of each object
    array.forEach((item, index) => {
        item.index = index;
    });

    return array;
};

// const arrayMove = (array, oldIndex, newIndex) => {
//     if (newIndex >= array.length) {
//         let k = newIndex - array.length;
//         while (k-- + 1) {
//             array.push(undefined);
//         }
//     }
//     array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
//     return array;
// };