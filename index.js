const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      if (collection instanceof Array) {
        const newCollection = collection.slice();
        for (let i = 0; i < newCollection.length; i++) {
          callback(newCollection[i], i, newCollection);
        };
        return collection;
      } else {
        const newCollection = Object.assign({}, collection);
        for (const key in newCollection) {
          callback(newCollection[key], key, newCollection);
        };
        return collection;
      };
    },

    map: function(collection, callback) {
      if (!(collection instanceof Array)){
        collection = Object.values(collection);
      };
      const newCollection = [];
      for (let i = 0; i < collection.length; i++) {
        newCollection.push(callback(collection[i], i, collection));
      };
      return newCollection;
    },

    reduce: function(collection, callback, acc) {
      if (!acc) {
        acc = collection[0];
        collection = collection.slice(1);
      };
      for (let i = 0; i < collection.length; i++) {
        acc = callback(acc, collection[i], collection);
      };
      return acc;
    },

    find: function(collection, predicate) {
      if (!(collection instanceof Array)){
        collection = Object.values(collection);
      };
      for (const element of collection) {
        if (predicate(element)) {
          return element;
        }
      }
      return undefined;
    },

    filter: function(collection, predicate) {
      if (!(collection instanceof Array)){
        collection = Object.values(collection);
      };
      const newArray = [];
      for (const element of collection) {
        if (predicate(element)) {
          newArray.push(element);
        };
      };
      return newArray;
    },

    size: function(collection) {
      return (collection instanceof Array) ? collection.length : Object.keys(collection).length;
    },

    first: function(array, n) {
      if (!n) {
        return array[0];
      };
      return array.slice(0, n);
    },

    last: function(array, n) {
      if (!n) {
        return array[array.length-1];
      };
      return array.slice(-n);
    },

    compact: function(array) {
      return array.filter(element => !!element !== false);
    },

    sortBy: function(array, callback) {
      const arrayCopy = array.slice();
      return arrayCopy.sort((a, b) => {
        return callback(a) - callback(b);
      });
    },

    flatten: function(array, shallow=false) {
      if (shallow) {
        return array.flat();
      };
      return array.flat(Infinity);
    },

    uniqSorted: function(collection, callback) {
      const sortedArray = [collection[0]];
      for (let i = 1; i < collection.length; i++) {
        if (callback(sortedArray[i-1]) !== callback(collection[i])) {
          sortedArray.push(collection[i]);
        };
      };
      return sortedArray;
    },

    uniq: function(array, sorted, callback) {
      if (sorted) {
        return fi.uniqSorted(array, callback);
      } else if (!callback) {
        return Array.from(new Set(array))
      } else {
        const modifiedValues = new Set();
        const uniqValues = new Set();
        for (const element of array) {
          const callbackedValue = callback(element);
          if (!modifiedValues.has(callbackedValue)) {
            modifiedValues.add(callbackedValue);
            uniqValues.add(element);
          };
        };
        return Array.from(uniqValues);
      };
    },

    keys: function(object) {
      // return Object.keys(object);
      const keys = [];
      for (const key in object) {
        keys.push(key);
      };
      return keys;
    },

    values: function(object) {
      // return Object.values(object);
      const values = [];
      for (const key in object) {
        values.push(object[key]);
      };
      return values;
    },

    functions: function(object) {
      const functionNames = [];
      for (const key in object) {
        if (typeof object[key] === "function") {
          functionNames.push(key);
        };
      };
      return functionNames.sort();
    },


  }
})()

fi.libraryMethod()
