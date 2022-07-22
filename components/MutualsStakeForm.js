import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import { useWeb3Contract } from "react-moralis"
import { wethAbi, wethAddress, 
        mutualsAbi, mutualsAddress, 
        achieverAbi, achieverAddress } from "../constants"
import { Form, networkConfigs } from "web3uikit" 
import { ethers } from "ethers"

export default function MutualsStakeForm() {

    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const mutuals = new ethers.Contract(mutualsAddress, mutualsAbi, provider.getSigner())

    const { runContractFunction } = useWeb3Contract()
    let wethApproveOptions = {
        abi: wethAbi, 
        contractAddress: wethAddress,
        functionName: "approve",
    }

    let achApproveOptions = {
        abi: achieverAbi, 
        contractAddress: achieverAddress,
        functionName: "approve",
    }

    let stakeOptions = {
        abi: mutualsAbi,
        contractAddress: mutualsAddress,
        functionName: "addLiquidity",
    }

    async function handleStakeSubmit(data){
        const wethAmountToApprove = data.data[0].inputResult
        wethApproveOptions.params = {
            guy: ethers.utils.parseUnits(wethAmountToApprove, "ether").toString(),
            wad: mutualsAddress,
        }
        
        const tx = await runContractFunction({
            params: wethApproveOptions,
            onError: (error) => console.log(error)
        })

        const achAmountToApprove = data.data[1].inputResult
        achApproveOptions.params = {
            amount: ethers.utils.parseUnits(achAmountToApprove, "ether").toString(),
            spender: mutualsAddress,
        }
   
        const tx1 = await runContractFunction({
            params: achApproveOptions,
            onError: (error) => console.log(error),
            onSuccess: () => {
                handleApproveSuccess(wethApproveOptions.params.amount, achApproveOptions.params.amount)
            },
        })
    }

    async function handleApproveSuccess(formattedWETHAmount, formattedACHAmount) {
        
        // let transaction = await mutuals.addLiquidity(formattedWETHAmount, formattedACHAmount)

        // await transaction.wait(1)

        stakeOptions.params = {
            _amount0: formattedWETHAmount,
            _amount1: formattedACHAmount,
        }
        console.log(stakeOptions,'sdjkask')
        console.log("We are here now...")        
        const tx = await runContractFunction({
            abi: stakeOptions.abi,
            contractAddress: stakeOptions.contractAddress,
            functionName: stakeOptions.functionName,
            params: stakeOptions.params,
            onError: (error) => console.log(error)
        })
        console.log(`yo guys codelife here : ${tx}`)
        await tx.wait(1)
        console.log("Transaction has confirmed by 1 block")
    }

    return (
        <div>
            <Form
                onSubmit={handleStakeSubmit}
                data={
                    [
                        {
                            inputWidth: "50%",
                            name: "Amount to stake (in WETH)",
                            type: "number",
                            value: "",
                            key: "amountToStake",
                        },
                        {
                            inputWidth: "50%",
                            name: "Amount to stake (in ACH)",
                            type: "number",
                            value: "",
                            key: "amountToStake",
                        },
                    ]}
                    title="Let's stake!"    
            ></Form>
        </div>
    )
}