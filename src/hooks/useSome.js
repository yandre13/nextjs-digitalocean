import { fetchPro } from 'lib/api'
import { useRef, useEffect, useReducer } from 'react'

const fetchData = async (query, ref, actions)=>{
    const {data, edges, status, error} = actions()
    status('pending')
    try {
        const res = await fetchPro(query)
        if(!res.posts.edges.length){
            status('ended')
        }
        else if(ref === 1){
            data(res)
            status('resolved')
        }else{
            edges(res?.posts?.edges)
            status('resolved')
        }
    } catch (e) {
        status('rejected')
        error(e.message)
    }
}

const ACTIONS = {
    UPDATE_DATA: 'UPDATE_DATA',
    UPDATE_ERROR : 'UPDATE_ERROR',
    UPDATE_EDGES : 'UPDATE_EDGES',
    UPDATE_STATUS: 'UPDATE_STATUS'
}

const reducer = (state, action)=>{
    switch (action.type){
        case ACTIONS.UPDATE_DATA:
            return {...state, data: action.payload}
        case ACTIONS.UPDATE_EDGES:
            return {...state, data: {posts: {edges: [...state.data?.posts?.edges, ...action.payload]}}}
        case ACTIONS.UPDATE_ERROR:
            return {...state, error: action.payload}
        case ACTIONS.UPDATE_STATUS:
            return {...state, status: action.payload}
        default:
            return state
    }
}

const initialState = {
    data: {},
    error: null,
    status: 'idle'
}


const createActions = (dispatch) => () =>{
    const data = (data)=>dispatch({type: ACTIONS.UPDATE_DATA, payload: data})
    const edges = (data)=>dispatch({type: ACTIONS.UPDATE_EDGES, payload: data})
    const status = (status)=>dispatch({type: ACTIONS.UPDATE_STATUS, payload: status})
    const error = (data)=>dispatch({type: ACTIONS.UPDATE_ERROR, payload: data})
    return {data, edges, status, error}
}

//query (String) => many times - reactive - for fetch
//start (Boolean) => only once - no reactive - only for first fetch
export const usePagination = (query, start)=>{

    const newQuery = JSON.stringify(query)
    const ref = useRef(1)
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(()=>{
        if(!start){
            return
        }
        const abortController = new AbortController()
        fetchData(newQuery, ref.current, createActions(dispatch))
        ref.current = 2
        return () => abortController.abort()
    }, [newQuery, start])
    return state
} 