const list = document.getElementById('list');

const obj1 = { a: 12, b: 24, c: 48 };
let count = 0;

// Add an object
/////////////////////////////
idb.set('key1', obj1, (r) => {
    if (r === true) {
        show('set() ---> OK');
    } else {
        show('set() ---> FAIL');
    }
});



// get() Retrieve an object 
/////////////////////////////
idb.get('key1', (r) => {
    if (r.a === obj1.a) {
        show('get() ---> OK');
    } else {
        show('get() ---> FAIL');
    }
});



// remove() Remove an object
/////////////////////////////
idb.remove('key1', (r) => {
    if (!r) {
        count++;
    }
});
idb.get('key1', (r) => {
    if (r == null) {
        count++;
        if (count = 2) {
            count = 0;
            show('remove() ---> OK');
        }
    }
});



// clear() Clear objectStore
/////////////////////////////
idb.set('k1', { a: 3, b: 2 });
idb.set('k2', { a: 4, b: 3 });
idb.set('k3', { a: 5, b: 4 });
idb.set('k4', { a: 6, b: 5 });

idb.clear((r) => {
    if (r === true) {
        count++;
    } else {
        show('clear() ---> FAIL ');
    }
});
idb.get('k3', (r) => {
    if (r == null) {
        count++;
    }
});
idb.get('k4', (r) => {
    if (r == null) {
        count++;
        if (count == 3) {
            show('clear() ---> OK');
        } else {
            show('clear() ---> FAIL');
        }
    }
})



function show(text) {
    let li = document.createElement('li');
    li.innerText = text;
    list.appendChild(li);
}