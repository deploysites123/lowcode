import { TableType } from '../table-definition/table-types'
import { Entity } from "./entity"

export default interface GenerationContext {
    useFormatter: boolean
    tableType: TableType
    entity: Entity
}
