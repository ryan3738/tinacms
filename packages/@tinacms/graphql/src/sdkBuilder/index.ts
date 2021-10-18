import { TinaSchema } from '../primitives/schema'
import { NAMER } from '../primitives/ast-builder'

export const buildSKD = (tinaSchema: TinaSchema) => {
  const methods = tinaSchema.getCollections().map((collection) => {
    const queryName = NAMER.queryName(collection.namespace)
    console.log({ queryName })
    const listQueryName = NAMER.generateQueryListName(collection.namespace)
    return `public ${queryName}(args: { relativePath: string }) {
        // const name = 'getAuthorDocument'
        // this._usedFrags.push(name)
        // const currentFrag = {
        //   ...this._frags[name],
        //   arguments: genArgs(args),
        // }
        // this._selections.push(currentFrag)
        return this
      }
  public ${listQueryName}(args: {}) {
    // const name = 'getAuthorDocument'
    // this._usedFrags.push(name)
    // const currentFrag = {
    //   ...this._frags[name],
    //   arguments: genArgs(args),
    // }
    // this._selections.push(currentFrag)
    return this
  }
  `
  })

  return `export class TinaGQLClient {
  ${methods.join('\n')}      
}`
}