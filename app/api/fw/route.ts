import { headers } from "next/headers";
import { NextResponse } from "next/server";
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
import {prisma} from "../../lib/prisma";


export async function POST(request: Request) {

  const headersList = headers()
  const signature = headersList.get('verif-hash');
  const secretHash = process.env.FLW_WEBHOOK_SECRET_HASH
  const json = await request.json();
  // check if hash from request === FLW_WEBHOOK_SECRET_HASH
  if (!signature || (signature !== secretHash)) {
    return new NextResponse(JSON.stringify({ message: "unsigned request" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  // fetch the response again from flutterwave
  /* let response = await flw.Transaction.verify({ id: json.data.id })
  console.log(response) */
  let response = json
  if( response.data.status.toLowerCase() === "successful" && response.data.currency.toLowerCase() === "ngn") {
    // Success! 
    // fetch trade based on transaction reference (transaction reference should be tradeId)
    const trade = await prisma.trade.findFirst({
      where: {id: response.data.reference},
      include: {escrow: true}
    })
    if(!trade){
      return new NextResponse(JSON.stringify({ message: "invalid reference" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    const existingTransaction = await prisma.transaction.findFirst({
      where: {flwId: response.data.id.toString()}
    })
    if(existingTransaction){
      console.log("already handled transaction")
      return new NextResponse(JSON.stringify({ message: "already handled transaction" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
   
    if(!trade.escrow){
      // if trade doesn't have an escrow, create escrow
      await prisma.escrow.create({
        data: {
          userId: trade.buyerId,
          tradeId: trade?.id,
          amount: parseFloat(response.data.amount),
        }
      })
    }else{
      // if it does, update the escrow by adding new payment to the amount
      await prisma.escrow.update({
        where: {id: trade.escrow.id},
        data: {amount: trade?.escrow?.amount + parseFloat(response.data.amount)}
      })
    }
    // create transaction 
    const transaction = await prisma.transaction.create({
      data: {
        flwId: response.data.id.toString(),
        benefactorId: trade.buyerId,
        beneficiaryId: trade.sellerId,
        amount: parseFloat(response.data.amount),
        tradeId: response.data.reference,
        escrowId: trade?.escrow?.id,
        type: "DEBIT",
        category: "Escrow Payment",
        transactionData: response.data,
        status: "SUCCESSFUL"
      }
    })
  } else {
    // send email to customer that there is an issue with their payment
  }
  console.log(json, signature)
  return new NextResponse(JSON.stringify({ message: "Data fetched successfully", data: json}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}