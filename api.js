// By default, wait a year before returning a value.
const Delay = 100

// The key to store data under
const LocalStorageKey = 'LRR_API_v2'

// Alternate between failures and successes
// let nextCallWillFail = false
function isFailure() {
  return false;
  nextCallWillFail = !nextCallWillFail
  return !nextCallWillFail
}

let nextId
let records

try {
  reset();
  let data = JSON.parse(localStorage.getItem(LocalStorageKey));
  nextId = data.nextId
  records = data.records
}
catch (e) {
  reset()
}

/**
 * Returns a promise to an array of objects, where the promise may be rejected.
 */
export function getRecords() {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (isFailure()) {
        reject({
          status: 500,
        })
      }
      else {
        reset();
        resolve({
          status: 200,
          data: records.slice(0).map(data => Object.assign({}, data)),
        })
      }
    }, Delay)
  })
}

/**
 * Returns a promise that resolves to the added record (including id), or is
 * rejected if the updates fails.
 */
export function createRecord(data) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (isFailure()) {
        reject({
          status: 500,
        })
      }
      else {
        let record = {
          ...data,
          id: nextId++,
        }

        records.push(record)
        save()

        resolve({
          status: 200,
          data: Object.assign({}, record),
        })
      }
    })
  })
}

/**
 * Returns a promise that resolves to the updated record, or is rejected if
 * the update fails.
 */
export function patchRecord(id, data) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (isFailure()) {
        reject({
          status: 500,
        })
      }
      else {
        let index = records.findIndex(data => data.id === id)

        if (index === -1) {
          reject({
            status: 404
          })
        }
        else {
          let { id, ...assignableData } = data
          let record = records[index]
          Object.assign(record, assignableData)
          save()
          resolve({
            status: 200,
            data: Object.assign({}, record),
          })
        }
      }
    })
  })
}

/**
 * Returns a promise that resolves when the delete is complete, or
 * is rejected if the delete fails.
 */
export function deleteRecord(id) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (isFailure()) {
        reject({
          status: 500,
        })
      }
      else {
        let index = records.findIndex(data => data.id === id)

        if (index === -1) {
          reject({
            status: 404
          })
        }
        else {
          records.splice(index, 1)
          save()
          resolve({
            status: 204,
          })
        }
      }
    })
  })
}

/**
 * Reset the stored data to the default
 */
export function reset() {
  // nextCallWillFail = false
  nextId = 1
  records = [
    {
      id: nextId++,
      name: 'Bill Gates',
      email: 'billg@microsoft.com',
      photoURL: 'https://frontarm.com/courses/learn-raw-react/bill-gates.jpg'
    },
    {
      id: nextId++,
      name: 'Jeff Bezos',
      email: 'jeff@amazon.com',
      photoURL: 'https://frontarm.com/courses/learn-raw-react/jeff-bezos.jpg'
    },
    {
      id: nextId++,
      name: 'Mark Zuckerberg',
      email: 'zuck@fb.com'
    },
  ]
  save()
}

function save() {
  localStorage.setItem(LocalStorageKey, JSON.stringify({ records, nextId }))
}

let resetButton = document.getElementById('reset-api')
if (resetButton) resetButton.onclick = reset