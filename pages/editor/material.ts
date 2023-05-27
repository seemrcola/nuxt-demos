/** ********** 这个文件没卵用 ************/
type editorType = 'Basic' | 'Shape'

export function globImport(dir: editorType) {
  let keys: any[] = []
  if (dir === 'Basic') {
    const components = import.meta.glob('~/components/Basic/*.vue', { eager: true })
    keys = Object.keys(components)
  }
  if (dir === 'Shape') {
    const components = import.meta.glob('~/components/Shape/*.vue', { eager: true })
    keys = Object.keys(components)
  }
  return keys.map((path: string) => {
    let name = path.replace(/^.*[\\\/]/, '').split('.')[0]
    name = dir + name
    return name
  })
}

export function getMaterialNames() {
  const materialBasic = globImport('Basic')
  const materialShape = globImport('Shape')
  const allmaterials = [
    ...materialBasic,
    ...materialShape,
  ]
  return allmaterials
}
