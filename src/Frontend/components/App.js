import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navigation from './Navigation';
import Home from './Home.js'
import Create from './Create.js'
import MyListedItems from './MyList.js'
import MyPurchases from './MyPurchase.js'
import MarketPlaceAbi from '../contractsData/MarketPlace.json'
import MarketPlaceAddress from '../contractsData/MarketPlace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import { useState } from 'react'
// import { ethers } from "ethers"
const ethers = require("ethers")
import { Spinner } from 'react-bootstrap'
import { Button } from "react-bootstrap"
import './App.css';
import { a } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  // MetaMask Login/Connect
  const web3Handler = async () => {
    // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0])

    // Set signer
    const signer = provider.getSigner(account)
    // console.log(provider.getCode(address))
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketPlaceAddress.address, MarketPlaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    setLoading(false)
  }

  return (
    <BrowserRouter>
      <div className="App">

        <div>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f8f9fa'}}>
              <h2  style={{ color: '#343a40', marginBottom: '20px', fontSize: '80px' }}>Welcome to IIT Roorkee's first ever NFT MarketSpace</h2>

              <Spinner animation="border" style={{ display: 'flex' }} />

              <p style={{ color: '#6c757d', marginBottom: '20px' }}>Awaiting Metamask Connection...</p>
              <Button onClick={web3Handler} >Connect Wallet</Button>
              <a href="https://metamask.io/">Don't have a Metamask Account?</a>
            </div>
            //   <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f8f9fa', borderRadius: '15px', padding: '20px' }}>
            //   <h2 style={{ color: '#343a40', marginBottom: '20px' }}>Welcome to IIT Roorkee's first ever NFT MarketSpace</h2>
            //   <Spinner animation="border" style={{ color: '#343a40', marginBottom: '20px' }} />
            //   <p style={{ color: '#6c757d', marginBottom: '20px' }}>Awaiting Metamask Connection...</p>
            //   <Button onClick={web3Handler} style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}>Connect Wallet</Button>
            // </div>
          ) : (
            <>
              <>
                <Navigation web3Handler={web3Handler} account={account} />
              </>
              <Routes>
                <Route path="/" element={
                  <Home marketplace={marketplace} nft={nft} />
                } />
                <Route path="/create" element={
                  <Create marketplace={marketplace} nft={nft} />
                } />
                <Route path="/my-listed-items" element={
                  <MyListedItems marketplace={marketplace} nft={nft} account={account} />
                } />
                <Route path="/my-purchases" element={
                  <MyPurchases marketplace={marketplace} nft={nft} account={account} />
                } />
              </Routes>

            </>
          )}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;