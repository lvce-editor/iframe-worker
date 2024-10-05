import * as Character from '../Character/Character.ts'
import * as AddSemiColon from '../AddSemiColon/AddSemiColon.js'

export const getContentSecurityPolicy = (items) => {
  return items.map(AddSemiColon.addSemicolon).join(Character.Space)
}
