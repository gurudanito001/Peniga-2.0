import {prisma} from '@/app/lib/prisma';
import axios from 'axios';
import { unstable_noStore as noStore } from 'next/cache';



/* const getAccessToken = async () => {
  const res = await axios({
    method: 'post',
    url: "https://sandbox.monnify.com/api/v1/auth/login",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_API_SECRET}`)}` 
    }
  })
  console.log(res.data)
  return res.data.responseBody.accessToken
} */

// --------------------------------- USER -----------------------------------------------

export async function getUserById(id: string | null | undefined) {
  noStore();
  try {
    const user = await prisma.user.findFirst({
      where: {...(id && {id}) }
    })
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    //throw new Error('Failed to fetch user.');
  }
  
}

export async function getUserByEmail(email: string | null | undefined) {
  noStore();
  try {
    const user = await prisma.user.findFirst({
      where: {...(email && {email}) },
      include: {
        wallet: true
      }
    })
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    //throw new Error('Failed to fetch user.');
  }
}

export async function getAllUsers({}: any) {
  noStore();
  try {
    const users = await prisma.user.findMany({
      where: {}
    })
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    //throw new Error('Failed to fetch users.');
  }
}

/* export async function getUserWallet(email: string | null | undefined) {
  noStore();
  try {
    const user = await prisma.user.findFirst({
      where: {...(email && {email}) },
      include: {
        wallet: true
      }
    })
    const wallet = await prisma.wallet.findFirst({
      where: {userId: user?.id}
    })
    return wallet;
  } catch (error) {
    console.error('Failed to fetch wallet:', error);
    //throw new Error('Failed to fetch wallet.');
  }
} */



// --------------------------------- WALLET -----------------------------------------------

/* export async function getWalletBalance(accountNumber: string | null | undefined) {
  noStore();
  try {
    let accessToken = await getAccessToken();
    const res = await axios({
      method: 'get',
      url: `${process.env.MONNIFY_BASE_URL}/disbursements/wallet/balance?accountNumber=${accountNumber}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
    })
    return res.data?.responseBody
  } catch (error) {
    console.error('Failed to fetch offer:', error);
  }
} */

/* export async function getBanks() {
  noStore();
  try {
    let accessToken = await getAccessToken();
    const res = await axios({
      method: 'get',
      url: `${process.env.MONNIFY_BASE_URL}/banks`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
    })
    return res.data?.responseBody
  } catch (error) {
    console.error('Failed to fetch offer:', error);
  }
} */

/* export async function fetchTransactions(data: {accountNuber?: string, pageSize: number, pageNo: number}) {
  
  try {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email);
    let accessToken = await getAccessToken();
    if(data?.accountNuber){
      const res = await axios({
        method: 'get',
        url: `${process.env.MONNIFY_BASE_URL}/disbursements/wallet/transactions?${data?.accountNuber ? `accountNumber=${data?.accountNuber}&` : ""}pageSize=${data?.pageSize || 20}&pageNumber=${data?.pageNo || 0}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      })
      return res.data?.responseBody;
    }
    return null
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data?.responseMessage)
    } else if (error.request) {
      throw new Error("Oops!! Something went wrong");
    } else {
      throw new Error("Oops!! Something went wrong");
    }
  }
} */

/* export async function fetchAllTransactions(data: { pageSize?: number, pageNo?: number}) {
  
  try {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email);
    let accessToken = await getAccessToken();
    
    const res = await axios({
      method: 'get',
      url: `${process.env.MONNIFY_BASE_URL}/transactions/search?page=${data?.pageNo}&size=${data?.pageSize}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
    })
    return res.data?.responseBody;
    
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data?.responseMessage)
    } else if (error.request) {
      throw new Error("Oops!! Something went wrong");
    } else {
      throw new Error("Oops!! Something went wrong");
    }
  }
} */


/* export async function getTotalEscrows(userId: string | undefined){
  const userEscrows = await prisma.escrow.findMany({
    where: {
      userId: userId,
      status: "PENDING"
    }
  })

  let total = 0;
  userEscrows.forEach( item =>{
    total += item?.amount
  })
  return total
} */

/* export async function getUserBalance (userId: string | undefined){
  try {
    const buyer = await prisma.user.findFirst({
      where: {id: userId},
      include: {
        wallet: true
      }
    })
    const buyerWalletBalance: {availableBalance: number, ledgerBalance: number} = await getWalletBalance(buyer?.wallet?.walletData?.accountNumber);
    return buyerWalletBalance ;
  } catch (error) {
    console.log(error);
  }
} */






// --------------------------------- OFFER -----------------------------------------------

export async function getOfferById(id: string | null | undefined) {
  noStore();
  try {
    const offer = await prisma.offer.findFirst({
      where: {...(id && {id}) },
      include: {
        user: true
      }
    })
    return offer;
  } catch (error) {
    console.error('Failed to fetch offer:', error);
    //throw new Error('Failed to fetch offer.');
  }
}

export async function getAllOffers(filterData?: {userId?: string, offerCategory?: "merchant" | "seller" | ""}) {
  noStore()
  try {
    const offers = await prisma.offer.findMany({
      where: {
        ...( filterData?.userId && {userId: filterData?.userId}),
        ...( filterData?.offerCategory && {offerCategory: filterData?.offerCategory}) 
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return offers;
  } catch (error) {
    console.error('Failed to fetch offers:', error);
    //throw new Error('Failed to fetch offers.');
  }
}

// --------------------------------- MARKET -----------------------------------------------


export async function getOffersForMarket(filterData?: 
  {
    userId: string | undefined, 
    cardName?: string| undefined,
    cardType?: string| undefined,
    rate?: number| undefined,
    valueInUSD?: number| undefined,
    minAmount?: number| undefined,
    maxAmount?: number| undefined
    offerCategory?: "merchant" | "seller" 
  }
) {
  noStore();
  try {
    const offers = await prisma.offer.findMany({ 
      where: {
        NOT: {
          OR: [
            {userId: filterData?.userId},
            {status: "COMPLETED"}
          ]
        },
        ...(filterData?.cardName && {cardName: filterData?.cardName}),
        ...(filterData?.cardType && {cardType: filterData?.cardType}),
        ...(filterData?.rate && {
          rate: {gte: filterData?.rate}
        }),
        ...(filterData?.valueInUSD && {
            AND: {
              minAmount: {lte: filterData?.valueInUSD}, 
              maxAmount: {gte: filterData?.valueInUSD}, 
            }
        }),
        valueInUSD: {
          ...(filterData?.minAmount) && {lte: filterData?.minAmount},
          ...(filterData?.maxAmount) && {gte: filterData?.maxAmount},
        }, 

        ...(filterData?.offerCategory && {offerCategory: filterData?.offerCategory})
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: "desc"
      } 
    });
    return offers
  } catch (error: any) {
    throw new Error("Failed to fetch offers")
  }
}


// --------------------------------- TRADE -----------------------------------------------

export async function getTradeById(id: string | null | undefined) {
  const trade = await prisma.trade.findFirst({
    where: {...(id && {id}) },
    include: {
      buyer: true,
      seller: true,
      escrow: true,
      dispute: true,
      transaction: true,
      payment: true
    }
  })
  return trade;
}

export async function getTempAccount(tradeId: string | null | undefined) {
  const tempAccount = await prisma.tempAccount.findFirst({
    where: {...(tradeId && {tradeId}) }
  })
  return tempAccount;
}



export async function getAllTrades(filterData: {userId?: string | undefined}) {
  const trades = await prisma.trade.findMany({
    where: {
      ...(filterData?.userId && {
        OR: [
          {buyerId: filterData?.userId},
          {sellerId: filterData?.userId}
        ]
      })
    },
    include: {
      buyer: true,
      seller: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return trades;
}

/* export async function getEscrowAccount() {
  const userData = await prisma.user.findFirst({
    where: {
      role: "SUPERADMIN"
    },
    include: {wallet: true}
  })
  return userData?.wallet?.walletData
} */


// --------------------------------- MESSAGES -----------------------------------------------

export async function getMessages(resourceId: string | undefined) {
  const messages = await prisma.message.findMany({
    where: {resourceId },
  })
  return messages;
}


// --------------------------------- DISPUTE -----------------------------------------------

export async function getDisputeById(id: string | null | undefined) {
  const dispute = await prisma.dispute.findFirst({
    where: {...(id && {id}) },
    include: {
      user: true,
      trade: {
        select: { buyer: true, seller: true, valueInUSD: true, rate: true, cardName: true, cardType: true }
      }
    }
  })
  return dispute;
}

export async function getAllDisputes(filterData:  {userId?: string | undefined, status?: "PENDING" | "RESOLVED"}) {
  const disputes = await prisma.dispute.findMany({
    where: {
      ...( filterData?.userId && {
        OR: [
          {buyerId: filterData?.userId},
          {sellerId: filterData?.userId}
        ]
      }),
      ...(filterData?.status && {status: filterData?.status})
    },
    include: {
      user: true,
      trade: {
        select: { buyer: true, seller: true, valueInUSD: true, rate: true }
      }
    }
  })
  return disputes;
}

// --------------------------------- ESCROW -----------------------------------------------

export async function getEscrowById(id: string | null | undefined) {
  const escrow = await prisma.escrow.findFirst({
    where: {...(id && {id}) },
    include: {
      user: true,
      trade: {
        select: {
          userId: true,
          buyer: true,
          seller: true,
          cardName: true,
          valueInUSD: true,
          rate: true,
          cardType: true,
          dispute: true
        }
      }
    }
  })
  return escrow;
}

export async function getAllEscrows(userId?: string | undefined) {
  const escrows = await prisma.escrow.findMany({
    where: {userId},
    include: {
      user: true,
      trade: {
        select: {
          seller: true,
          buyer: true
        }
      }
    }
  })
  return escrows;
}

// --------------------------------- TRANSACTION -----------------------------------------------

export async function getTransactionById(id: string | null | undefined) {
  const transaction = await prisma.transaction.findFirst({
    where: {...(id && {id}) },
    include: {
      benefactor: true,
      beneficiary: true,
      trade: true,
      escrow: true
    }
  })
  return transaction;
}

export async function getAllTransactions({userId}: {userId?: string}) {
  const transaction = await prisma.transaction.findMany({
    where: {
      ...(userId && {
        OR: [
          {benefactorId: userId},
          {beneficiaryId: userId}
        ]
      })
    }
  })
  return transaction;
}



// --------------------------------- Payments -----------------------------------------------

export async function getPaymentById(id: string | null | undefined) {
  const payment = await prisma.payment.findFirst({
    where: {...(id && {id}) },
    include: {
      user: true,
      trade: true
    }
  })
  return payment;
}

export async function getAllPayments({userId}: {userId?: string}) {
  const payments = await prisma.payment.findMany({
    where: {
      ...(userId && { userId: userId})
    },
    include: {
      user: true,
    }
  })
  return payments;
}

export async function getAllBanks() {
  try {
    const config = {
      'method': 'GET',
      'url': 'https://api.flutterwave.com/v3/banks/NG',
      'headers': {
        'Authorization': `Bearer ${process?.env?.FLW_SECRET_KEY}`
      }
    };
    return axios(config).then( res =>{
      console.log(res.data)
      return res.data
    }).catch( error =>{
      console.log(error)
    })
  } catch (error) {
    console.log(error)
  }
}

export async function verifyBankAccount({account_number, account_bank}: {account_number: string, account_bank: string}) {
  return {
    "data": {
      "account_number": "8140715723",
      "account_name": "Daniel Nwokocha Ndubuisi"
    }
  }
  try {


    /* const config = {
      'method': 'POST',
      'data': {account_number, account_bank},
      'url': 'https://api.flutterwave.com/v3/accounts/resolve',
      'headers': {
        'Authorization': `Bearer ${process?.env?.FLW_SECRET_KEY}`,
        'content-type': 'text/plain',
      }
    };
    return axios(config).then( res =>{
      console.log(res.data)
      return res.data
    }).catch( error =>{
      console.log(error)
    }) */
  } catch (error) {
    console.log(error)
  }
  /* var options = {
    method: 'POST',
    data: {account_number, account_bank},
    url: 'https://api.flutterwave.com/v3/accounts/resolve',
    headers: {
      Authorization: `Bearer ${process?.env?.FLW_SECRET_KEY}`
    }
  };
  const response = await axios(options);
  return response?.data */
}

// --------------------------------- BENEFICIARY -----------------------------------------------

export async function getBeneficiaryById(id: string | null | undefined) {
  const beneficiary = await prisma.beneficiary.findFirst({
    where: {...(id && {id}) }
  })
  return beneficiary;
}

export async function getAllBeneficiaries({}: any) {
  const beneficiaries = await prisma.beneficiary.findMany({
    where: {}
  })
  return beneficiaries;
}


// --------------------------------- MESSAGE -----------------------------------------------

export async function getMessagesByTradeId(tradeId: string | null | undefined) {
  const messages = await prisma.message.findMany({
    where: {...(tradeId && {resourceId: tradeId}) }
  })
  return messages;
}


// --------------------------------- Notifications -----------------------------------------------

export async function getNotificationsByUserId(userId: string | null | undefined) {
  const notifications = await prisma.notification.findMany({
    where: {...(userId && {
      OR: [
        {receiverId: userId},
        {senderId: userId}
      ]
    }) }
  })
  return notifications;
}
