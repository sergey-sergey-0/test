import reducer, {initialState, sortByColumn, load, dragNewTarget, dragStart} from '../slices/table'
import defaultData from '../resources/defaultTableData.json'

describe('table slice', () => {
    it('should sort normally', () => {
        const decode = (row: number) => state.data.content[row].revstmp
        const mockData = ['D', 'a', 'C', 'b', 'e']
        defaultData.content = defaultData.content.slice(0, 5)
            .map((row, i) => {
                row.revstmp = mockData[i]
                return row
            })

        let state = reducer(initialState, load(defaultData))
        state = reducer(state, sortByColumn(1))
        expect(state.rowOrder).toEqual([1, 3, 2, 0, 4])
        expect(state.rowOrder.map(decode)).toEqual(['a', 'b', 'C', 'D', 'e'])

        state = reducer(state, sortByColumn(1))
        expect(state.rowOrder).toEqual([4, 0, 2, 3, 1])
        expect(state.rowOrder.map(decode)).toEqual(['e', 'D', 'C', 'b', 'a'])

    })
    it('should change column order', () => {
        let state = reducer(initialState, load(defaultData))
        state = reducer(state, dragStart({source: 0, width: 0, x: 0, y: 0,}))
        state = reducer(state, dragNewTarget(1))
        expect(state.headers).toEqual(['revstmp', 'revision', 'user_id', 'user_email', 'user_name', 'well_id', 'well_name', 'well_type', 'changes_summary'])

        state = reducer(state, dragNewTarget(2))
        expect(state.headers).toEqual(['revstmp', 'user_id', 'revision', 'user_email', 'user_name', 'well_id', 'well_name', 'well_type', 'changes_summary'])

        state = reducer(state, dragNewTarget(0))
        expect(state.headers).toEqual(['revision', 'revstmp', 'user_id', 'user_email', 'user_name', 'well_id', 'well_name', 'well_type', 'changes_summary'])
    })
})