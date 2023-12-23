import { useEffect, useState } from "react"

export default function MyPurchase({marketplace,nft,account}){
    const[purchases,SetPurchases]=useState([])
    const[loading,setLoading]=useState([])
    const PurchaseList = async () => {
        // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
        const filter =  marketplace.filters.token_sold(null,null,null,null,null,account)
        const results = await marketplace.queryFilter(filter)
        //Fetch metadata of each nft and add that to listedItem object.
        const purchases = await Promise.all(results.map(async i => {
          // fetch arguments from each result
          i = i.args
          // get uri url from nft contract
          const uri = await nft.tokenURI(i.tokenId)
          // use uri to fetch the nft metadata stored on ipfs 
          const response = await fetch(uri)
          const metadata = await response.json()
          // get total price of item (item price + fee)
          const totalPrice = await marketplace.getTotalPrice(i.itemId)
          // define listed item object
          let purchasedItem = {
            totalPrice,
            price: i.price,
            itemId: i.itemId,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image
          }
          return purchasedItem
        }))
        setLoading(false)
        SetPurchases(purchases)
      }
    useEffect(()=>{
         PurchaseList()
    },[])
    if (loading){
        return "Loading ....."
    }
    return(
        <>
        {purchases.length>0?
        <>
        <>My purchases are:</>
        <div>{purchases.map((purchase,idx)=>{
            <p key={idx}>{purchase.image}</p> //Add additional features to it
        })}
        </div>
        </>
        :<>No Nfts Purchased</>
        }
        </>
    )
}