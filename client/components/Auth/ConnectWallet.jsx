import React, {useState, useEffect} from 'react'
import Layout from '../Layout'
import CreateAccount from './CreateAccount'

function ConnectWallet({socket}) {
  const [currentAccount, setCurrentAccount] = useState(null)


  const username = false //need to pull this trhoguh

  useEffect(() => {
    checkIfWalletIsConnected()
    checkNetwork()
  }, [])

  //Check we have access to the ethereum.window object
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log("Make sure you have MetaMask!")
        return
      } else {
        console.log("We have the ethereum object", ethereum)

        /* Check if we're authorized to access the user's wallet */
        const accounts = await ethereum.request({ method: "eth_accounts" })

        /* User can have multiple authorized accounts, we grab the first one if its there!*/
        if (accounts.length !== 0) {
          const account = accounts[0]
          console.log("Found an authorized account:", account)
          setCurrentAccount(account)
        } else {
          console.log("No authorized account found")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  //Check if wallet is on the Rinkeby Testnet
  const checkNetwork = async () => {
    if(!window.ethereum.networkVersion) return

    try { 
      if (window.ethereum.networkVersion !== '4') {
        alert("Please connect to Rinkeby!")
      }
    } catch(error) {
      console.log(error)
    }
  }

  // Implement connectWallet method
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert("You neeed to install MetaMask!");
        return
      }

      // Fancy method to request access to account
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })

      //Print connect wallets public address once they have authorized Metamask for our website
      console.log("connected", accounts[0])

      // Set State to current account
      setCurrentAccount(accounts[0])

      // Setup Event Listener
      // setupEventListener()

    } catch (error) {
      console.log(error)
    }
  }

  /* Check if user already has a NFT minted? - Would go here */

  //Decide what to render!
  const renderContent = () => {
    /* Scenario #1 - If user has has not connected to your app - Show Connect To Wallet Button*/
    if (!currentAccount) {
      return (
        <>
          <button
            onClick={connectWallet}
            className="mt-4 w-2/6 p-4 bg-gradient-to-r from-yellow-400 to-red-600 text-2xl font-bold rounded transform transition-all hover:scale-105 duration-500 ease-out"
          >
            Connect Wallet!
          </button>
        </>
      );
    } 
    /* Scenario #2 - If user has connected but does not have a username*/
    else if (currentAccount && username == false) {
      return (
        <>
          <CreateAccount socket={socket} walletAddress={currentAccount}/>
        </>
      )
    }
  }


  return (
    <Layout>
      {renderContent()}
    </Layout>
  )
}

export default ConnectWallet