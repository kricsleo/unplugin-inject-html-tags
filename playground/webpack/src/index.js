function component() {
  const element = document.createElement('pre')
  element.innerHTML = 'hi'
  return element
}

document.body.appendChild(component())
