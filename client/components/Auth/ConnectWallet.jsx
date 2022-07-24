import React, {useState, useEffect} from 'react'
import Layout from '../Layout'
import CreateAccount from './CreateAccount'
import Account from './Account'

function ConnectWallet({socket}) {
  const [publicAddress, setPublicAddress] = useState(null)
  const [currentAccount, setCurrentAccount] = useState({})

  useEffect(() => {
    checkIfWalletIsConnected()
    checkNetwork()
  }, [])

  useEffect(() => {
    if(!publicAddress) return
    checkIfPublicAddressIsStoredInDatabase(publicAddress)
  }, [publicAddress])

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
          setPublicAddress(account)
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
      const accounts = await ethereum.request({ method: "eth_requestAccounts" })

      //Print connect wallets public address once they have authorized Metamask for our website
      console.log("connected", accounts[0])
      setPublicAddress(accounts[0])

    } catch (error) {
      console.log(error)
    }
  }

  // Check publicAddress is stored in the DB
  const checkIfPublicAddressIsStoredInDatabase = () => {
    socket.emit("getPublicAddress", {publicAddress: publicAddress})
  }

  //Listen for get public address response
  socket.on('publicAddressResponse', (data) => {
    console.log("Public Address", data)
    setCurrentAccount(data)
  })

  const signAuthToken = () => {
    
  }
  

  //Decide what to render!
  const renderContent = () => {
    /* Scenario #1 - No wallet connected*/
    if (!publicAddress) {
      return (
        <div className='flex justify-center'>
          <button
            onClick={connectWallet}
            className="text-white mt-4 w-2/6 p-4 bg-gradient-to-r from-yellow-400 to-red-600 text-2xl font-bold rounded transform transition-all hover:scale-105 ease-in-out"
          >
            Connect MetaMask!
          </button>
        </div>
      )
    } 
    /* Scenario #2 - Wallet connect but no info stored in the database*/
    else if (publicAddress && !currentAccount.success) {
      return (
        <>
          <CreateAccount socket={socket} publicAddress={publicAddress} currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} checkIfPublicAddressIsStoredInDatabase={checkIfPublicAddressIsStoredInDatabase}/>
        </>
      )
    }
    /* Scenario #3 - Everything is avaliable - show account settings page*/
    else if (publicAddress && currentAccount.success) {
      return (
        <>
          <Account socket={socket} currentAccount={currentAccount}/>
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