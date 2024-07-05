
export const fetch2 = async (url,methods) => {
    console.log(methods);
    if(typeof(methods.headers)==typeof({})){
        methods.headers = {
            'Content-Type': 'application/json',
           ...methods.headers
        }
    }else{
        methods.headers = {
            'Content-Type': 'application/json',
        }
    }
    const res = await fetch(url, methods);
    return await res.json();
}


// window.fetch2 = async (url,methods) => {
//     console.log(methods);
//     if(typeof(methods.headers)==typeof({})){
//         methods.headers = {
//             'Content-Type': 'application/json',
//            ...methods.headers
//         }
//     }else{
//         methods.headers = {
//             'Content-Type': 'application/json',
//         }
//     }
//     const res = await fetch(url, methods);
//     return await res.json();
// }
