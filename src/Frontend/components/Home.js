import { useState,useEffect } from "react";
export default function Home ({marketplace,nft}){
    const[loading,setLoading] = useState(true)
    const[items,setItems]= useState([])
 async function LoadListedNfts_in_Marketplace(){
    const items = []
     const tokenCount =await marketplace.token_Listed_count();
     for (let i = 0;i<=tokenCount;i++){
        let item =await marketplace.Items(i)
        if (!item.sold){
      //  let totalPrice 
        const uri =  await nft.tokenURI(item.tokenID)
        const response =  await fetch(uri)
        const metadata = await response.json()
     items.push({
        // TotalPrice:totalPrice,
        price:item.price,
        description:metadata.description,
        seller:item.seller,
        image:metadata.image,
        name:metadata.name
     })}}
     setLoading[!loading]
     setItems[items]
     }

  async function handlePurchase(item){
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()//Reason for extra bracket to be established
    LoadListedNfts_in_Marketplace()
  }
  useEffect(()=>{
    LoadListedNfts_in_Marketplace()
  },[])
  if (loading){
    return(
    <>Loading.....</>)
  }
  return (
    <>{items.length>0 ?
          <div > {items.map((item,id)=>{<>
      
               <p key={id}>{item.image} </p>
               <p onClick={()=>{handlePurchase(item)}}>Buy this NFT</p>
               <p>Price:{item.price}</p>
 </>})}
          </div>
        :<div>No NFT is listed in this marketPlace. Go to "Create" section </div>
  }</>

 )
}