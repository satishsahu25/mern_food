import React, { createContext, useContext, useReducer } from 'react'

const CartstateContext=createContext();
const cartdispatchcontext=createContext();


const reducer=(state,action)=>{

    switch(action.type){
        case "ADD":
            return [...state,{id:action.id,name:action.name,qty:action.qty,
                size:action.size,price:action.price,img:action.img}]
        
        case "REMOVE":
            let newarr=[...state]
            newarr.splice(action.index,1)
            return newarr;
        
        case "UPDATE":
            let arr=[...state]
            arr.find((food,index)=>{
                if(food.id===action.id){
                    arr[index]={...food,qty:parseInt(action.qty)+food.qty,price:action.price+food.price}
                }
            })

            return arr;

        case "DROP":
            let emptyarr=[]
            return emptyarr;
        default:
            console.log("error in reducer")
    }


}

export const CartProvider=({children})=>{

    const [state,dispatch]=useReducer(reducer,[]);
    return (
        <cartdispatchcontext.Provider value={dispatch}>
            <CartstateContext.Provider value={state}>
                {children}
            </CartstateContext.Provider>
        </cartdispatchcontext.Provider>
    )
}

export const useCart=()=>useContext(CartstateContext);
export const useDispatchCart=()=>useContext(cartdispatchcontext);

