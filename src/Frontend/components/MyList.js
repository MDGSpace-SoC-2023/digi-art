import { useEffect, useState } from "react";

export default function MyList({marketplace,nft,account}){
    const[items,SetItems]=useState([])
    const[loading,SetLoading]=useState(true)
 async   function handleItemsUpdate(){
        let items = []
        const token_listed_count =await marketplace.token_Listed_count()
        for (let i = 1; i <=token_listed_count; i++) {
            const item = await marketplace.items(i);
             if( item.seller === account){
                const uri = await nft.tokenuri(item.tokenID)
                const response = await fetch(uri)
                const metadata = await response.json()
                // const price=item.price
                items.push({
                    // Totalprice:totalprice,
                    price: item.price,
                    itemID:item.itemID,
                    image:metadata.image,
                    name:metadata.name,
                    description:metadata.description
                })
             }
        }
        SetLoading(false)
        SetItems(items)
    }
useEffect(()=>{
    handleItemsUpdate()
},[])  
if (loading){
    return "Loading..."
}  
return(
    <>{items.length>0?
        <>
    <p>My Listed NFTs:</p>
    <div >
   {items.map((item,idx)=>{
    
    <p key = {idx}>{item.image}</p>//also add name and decription
   })}
     </div></>
     :
     <p>You have not listed any Items </p>}
    </>
)
}