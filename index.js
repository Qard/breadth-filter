function targetFor (source) {
  if (Array.isArray(source)) return []
  if (typeof source === 'object') return {}
}

module.exports = function breadthFilter (root, fn) {
  const target = targetFor(root)
  if (!target) return root

  const queue = [[ root, target, [] ]]
  let item

  while (item = queue.shift()) {
    const [ source, target, path ] = item
    for (const [ key, value ] of Object.entries(source)) {
      const fieldPath = path.concat(key)
      const newTarget = targetFor(value)
      if (newTarget) {
        target[key] = newTarget
        queue.push([ value, target[key], fieldPath ])
      } else {
        target[key] = fn(value, key, fieldPath)
      }
    }
  }

  return target
}
