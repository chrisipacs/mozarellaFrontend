/**
 * Created by krisztian on 2017. 06. 24..
 */

export function isOwnerOfList(state){
    return state.listsContext.activeList.owner != undefined && state.listsContext.activeList.owner.id==state.studentContext.student.id
}