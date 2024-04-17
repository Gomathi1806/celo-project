import React from 'react'
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'
import BigNumber from "bignumber.js"
import CUSDAbi from "../contracts/erc20.abi.json"
import ToksavAbi from "../hardhat/contracts/Toksav.abi.json"
import { newKit } from '@celo/contractkit/lib/mini-kit'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'


const useAuthentication = () => {
    const queryClient = useQueryClient();
    const ERC20_DECIMALS = 18
    const navigate = useNavigate()

    const </Toksav>Address = "0x31C32964F1D5F931c6D77518c57166d813426B14"
    const cUSDContractAddress = "0x874069fa1eb16d44d622f2e0ca25eea172369bc1"

    let kit
    let contract
    let accounts
    let donations
    let patients = []
    let projects = []


    //connect to the wallet
    const connectCeloWallet = async function () {
        if (window.celo) {
            console.log("windows object :", window.celo)
            try {

                await window.celo.enable()
                const web3 = new Web3(window.celo)
                kit = newKitFromWeb3(web3)

                accounts = await kit.web3.eth.getAccounts()
                kit.defaultAccount = accounts[0]

                contract = new kit.web3.eth.Contract(ToksavAbi, ToksavContractAddress)
                const cUSDContract = new kit.web3.eth.Contract(CUSDAbi, cUSDContractAddress)
                const balance = await cUSDContract.methods.balanceOf(accounts[0]).call()

                
                const mySafes = await contract.methods
                    .getMySafes()
                    .call()

                // const myCampaigns = await contract.methods
                //     .getMyCampaigns()
                //     .call()
                console.log("balance :", balance);
                // queryClient.setQueryData(['userCampaigns'], myCampaigns)

                queryClient.setQueryData(['userBalance'], (Number(balance) / 1e18))
                queryClient.setQueryData(['accountAddress'], accounts[0])
                queryClient.setQueryData(['mySafes'], mySafes)
                navigate('dashboard')

                console.log("my safes here :", test, accounts);

            } catch (error) {
                // notification(`⚠️ ${error}.`)
            }
        } else {
            //   notification("⚠️ Please install the CeloExtensionWallet.")
        }
    }


    return { connectCeloWallet }
}

export default useAuthentication