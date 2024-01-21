import axios from 'axios';
import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'

const Create = ({ marketplace, nft }) => {
  const [fileImg, setFile] = useState(null);
  const [name, setName] = useState("")
  const [desc, setDescription] = useState("")
  const [price, setPrice] = useState("")
 



  const sendJSONtoIPFS = async (ImgHash) => {

    try {

      const resJSON = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
        data: {
          "name": name,
          "description": desc,
          "image": ImgHash
        },
        headers: {
          'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
          'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_API_KEY,

        },
      });

    

      const tokenURI = `https://gateway.pinata.cloud/ipfs/${resJSON.data.IpfsHash}`;
      console.log("Token URI", tokenURI);
      //mintNFT(tokenURI, currentAccount)   // pass the winner
      mintThenList(tokenURI)
    } catch (error) {
      console.log("JSON to IPFS: ")
      console.log(error);
    }


  }


  ////////////////////////////////////////////////////////

  const sendFileToIPFS = async (e) => {

    e.preventDefault();
    

    if (fileImg) {
      try {

        const formData = new FormData();
        formData.append("file", fileImg);
        console.log(formData)
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
            'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_API_KEY,
            "Content-Type": "multipart/form-data"
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        
        sendJSONtoIPFS(ImgHash)


      } catch (error) {
        console.log("File to IPFS: ")
        console.log(error)
      }
    }
  }



  const mintThenList = async (uri) => {
    // const uri = `https://ipfs.infura.io/ipfs/${result.path}`
    // mint nft 
    try {
    await (await nft.mint(uri)).wait()
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    console.log("token ID : ",id)
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait()
    console.log("token is given approval") 
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await (await marketplace.ListItem(listingPrice,nft.address, id )).wait()
    console.log("Item listed in Marketspace")}
    catch(error){console.log("Error in minting NFT",error)}
  }
  return (

    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control onChange={(e) => setFile(e.target.files[0])} size="lg" required type="file" name="file" />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              <div className="d-grid px-0">
                <Button onClick={sendFileToIPFS} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
    
    )
}

export default Create
// import { useState } from "react"
// import { create as ipfsHttpClient } from 'ipfs-http-client'
// import {Row,Form,Button} from "react-bootstrap"
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
// export default function Create ({marketplace,nft}){
//     const[nftname,SetNftname] =  useState('')
//     const[description,SetDescription] = useState('')
//     const[price,SetPrice]=useState(null)
//     const[image,SetIMage]=useState(``)
//     const[pass,SetPass]=useState(true)
//    async function ipfsfunction(event){
//       let file = event.target.files[0]
//       if (file !== undefined){
//       result= await client.add(file)
//       try {
//         console.log(result)
//       SetIMage(`https://ipfs.infura.io/ipfs/${result.path}`)
//       } catch (error) {
//        console.log("Error in uploading to IPFS",error)
//       }
//    }}
//    async function ListNFT(){
//     if (image&&description&&nftname&&price){
//     try {
//     const result = await client.add(JSON.stringify({image,nftname,description,price}))
//     MintNFT(result)
//     } catch (error) {
//         console.log("ERROR IN COLLECTING URI OF THE IMAGE",error)
//     }
//     SetPass(true)

// }
// else{SetPass(false)}
    
//    }
//    async function MintNFT(result){
//    const uri = `https://ipfs.infura.io/ipfs/${result.path}`
//    await(await nft.mint(uri)).wait()
//    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
//    const id = nft.tokenCount()
//    await(await marketplace.ListItem(price,nft,id))  //Arguments passed according Marketplace.sol 
//    }
//     return(
//         <div className="container-fluid mt-5">
//         <div className="row">
//           <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
//             <div className="content mx-auto">
//               <Row className="g-4">
//                 <Form.Control
//                   type="file"
//                   required
//                   name="file"
//                   onChange={ipfsfunction}
//                 />
//                 <Form.Control onChange={(e) => SetNftname(e.target.value)} size="lg" required type="text" placeholder="Name" />
//                 <Form.Control onChange={(e) => SetDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
//                 <Form.Control onChange={(e) => SetPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
//                 <div className="d-grid px-0">
//                   <Button onClick={ListNFT} variant="primary" size="lg">
//                     Create & List NFT!
//                   </Button>
//                 </div>
//               </Row>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }
