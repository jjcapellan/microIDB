# microIDB
Minimal and easy to use wrapper for [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (asynchronous client-side storage). **microIDB** focuses on simplicity, which is why it has reduced the number of functionalities to the essential ones (the same functionality of localStorage).  

---

## Features
* Small size (browser bundle ~1Kb gziped)
* Stores data on browser storage.
* Retrieves data from browser storage.
* Removes data from browser storage.
* Checks for key existence. 
* Checks browser support.
  
  
---
  

## Installation
### Browser
There are two alternatives:
* Download the file [microidb.umd.js](https://cdn.jsdelivr.net/gh/jjcapellan/microIDB@1.0.0/dist/microidb.umd.js) to your project folder and add a reference in your html:
```html
<script src = "microidb.umd.js"></script>
```  
* Point a script tag to the CDN link:
```html
<script src = "https://cdn.jsdelivr.net/gh/jjcapellan/microIDB@0.1.0/dist/microidb.umd.js"></script>
```  
**Important**: the library is exposed as **idb**
### From NPM
```
npm i microidb
```
Then you can acces the class as:
* CommonJS module:
```javascript
const idb = require('microidb');
```
* EMS module:
```javascript
import * as idb from 'microidb';
```
  

---
  

## How to use
```javascript
// Check browser support
if(!idb.checkSupport()){
    console.log('Browser not supported by microIDB');
};

// Store data in browser
idb.set('myKey', {a: 2, b: 4, c: 6});

// Retrieve data
idb.get('myKey', (data) => {
    console.log(data.b); // prints 4
});

// Remove data
idb.remove('myKey');

// Clear all stored data
idb.clear();

// Check key existence
idb.exists('mykey', (exists) => {
    if(exists){
        console.log('There is data stored with key "mykey" in the database');
    }
})
```
  

---
  

## API
It is similar to the api of localStorage, but in this case indexedDB is asynchronous, so the use of callbacks is necessary.  

### **set(key: string, value: any, onComplete?: (ok: boolean) => void)**
This function stores a data *value* in the browser storage identified by a *key*. The optional callback *onComplete* receives *true* if all is ok, or *false* if the operation could not be completed.  

### **get(key: string, onComplete: (result: any) => void)**
This function retrieves the data identified by *key*. *onComplete* receives the retrieved data.
### **remove(key: string, onComplete?: (ok: boolean) => void)**
This function removes the data identified by *key*. The optional callback *onComplete* receives *true* if all is ok, or *false* if the operation could not be completed.  

### **clear()**
This function removes all data.  

### **exists(key: string, onComplete: (exists: boolean) => void)**
This function checks for *key* existence in the database. *onComplete* receives *true* if *key* is present in the database.

### **checkSupport(): boolean**
This function returns *true* if microIDB is supported by the browser.  
Actually these are the browsers supported:
* Edge 79+
* Chrome 48+
* Firefox 16+
* Opera 15+
* Safari 15+

---
  

## License
**microIDB** is licensed under the terms of the MIT open source license.