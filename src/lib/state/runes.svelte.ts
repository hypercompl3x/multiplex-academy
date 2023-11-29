function createMessage() {
  let value = $state("")

  function remove() {
    value = ""
  }

  return {
    get value() { return value },
    set value(newValue) { value = newValue },
    remove
  }
}

export const message = createMessage()