import { expect } from 'chai'
import MessageReducer from './messageReducer'

describe('Message Reducer', () => {
    const initState = {
        logMsg: {
            type: undefined,
            msg: undefined
        },
        regMsg: {
            type: undefined,
            msg: undefined
        },
        updateMsg: {
            type: undefined,
            msg: undefined
        }
    }

    it('should initialize state', () => {

        expect(
            MessageReducer(initState, {})
        ).to.eql(initState)
    })

    it('should state error ', () => {
        expect(
            MessageReducer(initState, {type :'LOGIN_ERR', errorMsg:'login error msg' })
        ).to.eql(
            {
                ...initState,
                logMsg: {
                    type: false,
                    msg: 'login error msg'
                }

            }
        )
        expect(
            MessageReducer(initState, {type :'UPDATE_ERR', errorMsg:'update error msg' })
        ).to.eql(
            {
                ...initState,
                updateMsg: {
                    type: false,
                    msg: 'update error msg'
                }

            }
        )
        expect(
            MessageReducer(initState, {type :'REG_ERR', errorMsg:'reg error msg' })
        ).to.eql(
            {

                ...initState,
                regMsg: {
                    type: false,
                    msg: 'reg error msg'
                }

            }
        )

    })

    it('should state success', () => {


        expect(
            MessageReducer(initState, {type :'REG', msg:'reg success msg' })
        ).to.eql(
            {
                ...initState,
                regMsg: {
                    type: true,
                    msg: 'reg success msg'
                }

            }
        )
    })


})