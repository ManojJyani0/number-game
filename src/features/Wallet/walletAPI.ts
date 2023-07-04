export default async function fetchData(params:any) {
    return new Promise(async(resolve)=>{
        const response =  await fetch("/api/");
        const {data} = await response.json();
        return resolve(data);
    })
}