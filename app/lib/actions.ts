'use server';
import {z} from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { getUserByEmail } from "./data";
import axios from "axios";
import generateRandomId from "./generateRandomId";
import type { Trade } from ".prisma/client";
import { put } from '@vercel/blob';

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);


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

export async function postImage(file: any, fileName: any) {
  const blob = await put(fileName, file, {
    access: 'public',
  });
  console.log("blob:", blob)
  return blob;
}


// ----------------------------LOGIN ------------------------------------
const loginFormSchema = z.object({
  email: z.string({
    invalid_type_error: 'Email is required',
  }),
  username: z.string(),
  password: z.string({
    invalid_type_error: 'Password is required',
  })
});

const loginForm = loginFormSchema.omit({  username: true, });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {


  const validatedLoginFields = loginForm.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedLoginFields.success) {
    console.log(validatedLoginFields.error)
    return "Invalid Login Credentials" 
  }

  const {email, password} = validatedLoginFields.data

  try {
    /* await prisma.user.update({
      where: {email: "daniel.marlayer@gmail.com"},
      data: {role: "SUPERADMIN"}
    }) */
    await signIn('credentials', {email, password});
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
        default:
          console.log(error)
          return "something went wrong"
      }
    }
    throw error;
  }
}




// -------------------------- REGISTER ---------------------------------------------------

const registerFormSchema = z.object({
  id: z.string(),
  firstName: z.string({
    invalid_type_error: 'Firstname is required.',
  }),
  lastName: z.string({
    invalid_type_error: 'Lastname is required',
  }),
  email: z.string({
    invalid_type_error: 'Email is required',
  }),
  password: z.string({
    invalid_type_error: 'Password is required',
  }),
  emailConfirmed: z.boolean(),
  username: z.string(),
  avater: z.string(),
  showBalance: z.boolean(),
  role: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const registerForm = registerFormSchema.omit({ id: true, date: true, emailConfirmed: true, avater: true, showBalance: true, role: true, createdAt: true, updatedAt: true });
export type registerState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    username?: string[],
    password?: string[];
  };
  message?: {severity: string, message: string}
};


export async function register(
  prevState: registerState,
  formData: FormData,
) {

  const validatedRegisterFields = registerForm.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedRegisterFields.success) {
    console.log(validatedRegisterFields.error)
    return {
      errors: validatedRegisterFields.error.flatten().fieldErrors,
      message: {
        severity: "error",
        message: 'Missing Fields. Failed to Register user',
      } 
    };
  }

  // Prepare data for insertion into the database
  const { firstName, lastName, email, username, password } = validatedRegisterFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = {firstName, lastName, email, username, password: hashedPassword};

  

  // Insert data into the database
  try {
    const user = await prisma.user.create({
      data: data,
    });
    //redirect('/login');
    return {
      message: {
        severity: "success",
        message: 'User registration successful',
      } 
    }
  } catch (error: any) {
    return {
      message: {
        severity: "error",
        message: error?.message,
      } 
    };
  }
}


// ---------------------------------------------- CREATE WALLET -------------------------------------
/* const CreateWalletFormSchema = z.object({
  bvn: z.string(),
  bvnDateOfBirth: z.string(),
});


export type WalletErrorState = {
  errors?: {
    bvn?: string[];
    bvnDateOfBirth?: string[];
  };
  message?: {severity: string, message: string}
}; */

/* export async function createWallet( prevState: WalletErrorState, formData: FormData) {
  console.log(formData);
  
  const validatedFields = CreateWalletFormSchema.safeParse({
    bvn: formData.get('bvn'),
    bvnDateOfBirth: formData.get("bvnDateOfBirth")
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: {severity: "error", message: 'Missing Fields. Failed to Create Wallet.' },
    };
  }

  // Prepare data for insertion into the database
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email)
  const { bvn, bvnDateOfBirth } = validatedFields.data;
  const data = {
    walletReference: user?.id,
    walletName: `${user?.firstName} ${user?.lastName} - Peniga`,
    customerName: `${user?.firstName} ${user?.lastName}`,
    bvnDetails: {
      bvn,
      bvnDateOfBirth
    },
    customerEmail: user?.email
  }
  console.log(data);

  // Insert data into the database
  try {
    let accessToken = await getAccessToken();
    const res = await axios({
      method: 'post',
      url: `${process.env.MONNIFY_BASE_URL}/disbursements/wallet`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      data: data
    })
    console.log(res.data)
    if(user && res.data.responseBody){
      const wallet = await prisma.wallet.create({
        data: {
          userId: user?.id,
          walletData: res.data?.responseBody
        }
      })
    }
    revalidatePath("/dashboard")
    return {
      message: {
        severity: "success",
        message: 'Wallet created successfully',
      } 
    }
  } catch (error: any) {
    console.log(error?.response?.data)
    return {
      message: {
        severity: "error",
        message: 'Failed to create Wallet',
      } 
    }
  }
  
} */


/* export async function toggleShowBalance(userId: string){
  try {
    let showBalance: boolean;
  const wallet = await prisma.wallet.findFirst({
    where: {userId}
  })
  showBalance = wallet?.showBalance === true ? false : true;
  await prisma.wallet.update({
    where: {userId},
    data: {showBalance: showBalance}
  })
  return showBalance
  } catch (error) {
    console.log(error)
  }
} */


/* export async function validateBankAccount(data: {accountNumber: string, bankCode: string} ) {
  try {
    let accessToken = await getAccessToken();
    const res = await axios({
      method: 'get',
      url: `${process.env.MONNIFY_BASE_URL}/disbursements/account/validate?accountNumber=${data?.accountNumber}&bankCode=${data?.bankCode}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
    })
    return res.data?.responseBody
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


/* export async function initiateTransfer(data: {amount: string, bankCode: string, accountNumber: string, narration: string} ) {
  
  try {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email);
    let accessToken = await getAccessToken();
    const completeData: any = {
      amount: parseInt(data?.amount),
      reference: `${user?.wallet?.id}--${generateRandomId(12)}`,
      narration: data?.narration,
      destinationBankCode: data?.bankCode,
      destinationAccountNumber: data?.accountNumber,
      currency: "NGN",
      sourceAccountNumber: user?.wallet?.walletData?.accountNumber
    }
    const res = await axios({
      method: 'post',
      url: `${process.env.MONNIFY_BASE_URL_2}/disbursements/single`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      data: completeData
    })
    const walletBalance = await getWalletBalance(user?.wallet?.walletData?.accountNumber);
    return {...res.data?.responseBody, ...walletBalance};
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



/* export async function authorizeTransaction(data: {reference: string, authorizationCode: string} ) {
  
  try {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email);
    let accessToken = await getAccessToken();
    const completeData: any = {
      reference: data.reference,
      authorizationCode: data.authorizationCode
    }
    const res = await axios({
      method: 'post',
      url: `${process.env.MONNIFY_BASE_URL_2}/disbursements/single/validate-otp`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      data: completeData
    })
    revalidatePath("/dashboard")
    return {...res.data?.responseBody};
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










// ---------------------------------------------- CREATE OFFER  ---------------------------------------
const CreateOfferFormSchema = z.object({
  id: z.string(),
  userId: z.string(),
  cardName: z.string(),
  valueInUSD: z.number(),
  rate: z.number(),
  minAmount: z.number(),
  maxAmount: z.number(),
  cardType: z.string(),
  offerCategory: z.string()
});


export type OfferErrorState = {
  errors?: {
    cardName?: string[];
    valueInUSD?: string[];
    rate?: string[];
    minAmount?: string[];
    maxAmount?: string[];
    cardType?: string[];
    offerCategory?: string[];
  };
  message?: {severity: string, message: string}
};
 
export async function createOffer(userId: string | undefined, prevState: OfferErrorState, formData: FormData) {
  console.log(formData)
  let offerCategoryValue = formData.get("offerCategory")
  const CreateOffer = CreateOfferFormSchema.omit({ id: true, ...(offerCategoryValue === "merchant" ? {valueInUSD: true} : {minAmount: true, maxAmount: true}) });
  const validatedFields = CreateOffer.safeParse({
    userId,
    cardName: formData.get('cardName'),
    valueInUSD: formData.get("valueInUSD") !== null ? parseInt(formData.get('valueInUSD')?.toString() || "") : formData.get('valueInUSD'),
    rate: formData.get("rate") !== null ? parseInt(formData.get('rate')?.toString() || "") : formData.get('rate'),
    minAmount: formData.get("minAmount") !== null ? parseInt(formData.get('minAmount')?.toString() || "") : formData.get('minAmount'),
    maxAmount: formData.get("maxAmount") !== null ? parseInt(formData.get('maxAmount')?.toString() || "") : formData.get('maxAmount'),
    cardType: formData.get('cardType'),
    offerCategory: formData.get('offerCategory'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: {severity: "error", message: 'Missing Fields. Failed to Create Offer.' },
    };
  }

  // Prepare data for insertion into the database
  const { cardName, valueInUSD, rate, minAmount, maxAmount, cardType, offerCategory } = validatedFields.data;
  const session = await auth();
  let user = await prisma.user.findFirst({
    where: {...(session?.user?.email && {email: session?.user?.email})}
  })

  // Insert data into the database
  try {
    if(user?.id){
      const offer = await prisma.offer.create({
        data: {userId: user?.id, cardName, valueInUSD, rate, minAmount, maxAmount, cardType, offerCategory}
      })
      revalidatePath('/dashboard/offers');
      return {
        message: {
          severity: "success",
          message: 'Offer Created Successfully',
        } 
      }
    }
  } catch (error) {
    return {
      message: {
        severity: "error",
        message: 'Failed to create Offer',
      } 
    }
  }
  
  redirect('/dashboard/offers');
}



// ---------------------------------------- EDIT OFFER --------------------------------------------------
const EditOfferFormSchema = z.object({
  cardName: z.string(),
  valueInUSD: z.number(),
  rate: z.number(),
  minAmount: z.number(),
  maxAmount: z.number(),
  cardType: z.string(),
  offerCategory: z.string()
});

export async function editOffer(offerId: string | undefined, prevState: OfferErrorState, formData: FormData) {
  console.log(formData)
  let offerCategoryValue = formData.get("offerCategory")
  const EditOffer = EditOfferFormSchema.omit({ id: true, ...(offerCategoryValue === "merchant" ? {valueInUSD: true} : {minAmount: true, maxAmount: true}) });
  const validatedFields = EditOffer.safeParse({
    cardName: formData.get('cardName'),
    valueInUSD: formData.get("valueInUSD") !== null ? parseInt(formData.get('valueInUSD')?.toString() || "") : formData.get('valueInUSD'),
    rate: formData.get("rate") !== null ? parseInt(formData.get('rate')?.toString() || "") : formData.get('rate'),
    minAmount: formData.get("minAmount") !== null ? parseInt(formData.get('minAmount')?.toString() || "") : formData.get('minAmount'),
    maxAmount: formData.get("maxAmount") !== null ? parseInt(formData.get('maxAmount')?.toString() || "") : formData.get('maxAmount'),
    cardType: formData.get('cardType'),
    offerCategory: formData.get('offerCategory'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: {severity: "error", message: 'Missing Fields. Failed to Create Offer.' },
    };
  }

  // Prepare data for insertion into the database
  const { cardName, valueInUSD, rate, minAmount, maxAmount, cardType, offerCategory } = validatedFields.data;
  /* const session = await auth();
  let user = await prisma.user.findFirst({
    where: {...(session?.user?.email && {email: session?.user?.email})}
  }) */

  // Insert data into the database
  try {
      const offer = await prisma.offer.update({
        data: {cardName, valueInUSD, rate, minAmount, maxAmount, cardType, offerCategory},
        where: {id: offerId}
      })
      revalidatePath(`/dashboard/offers/${offerId}`);
      return {
        message: {
          severity: "success",
          message: 'Offer updated successfully',
        } 
      }
  } catch (error) {
    return {
      message: {
        severity: "error",
        message: 'Failed to update Offer',
      } 
    }
  }
  //redirect('/dashboard/offers');
}





// ---------------------------------------------- CREATE TRADE  ---------------------------------------
const CreateTradeFormSchema = z.object({
  id: z.string(),
  userId: z.string(),
  buyerId: z.string(),
  sellerId: z.string(),
  cardName: z.string(),
  valueInUSD: z.number(),
  rate: z.number(),
  cardType: z.string(),
  offerId: z.string(),
  giftCardSent: z.string(),
  timeSent: z.string()
});


export type CreateTradeErrorState = {
  errors?: {
    valueInUSD?: string[];
  };
  message?: {severity: string, message: string}
};
 
export async function createTrade(data: any) {
  const CreateTrade = CreateTradeFormSchema.omit({ id: true, giftCardSent: true, timeSent: true });
  const validatedFields = CreateTrade.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: {severity: "error", message: 'Missing Fields. Failed to Create Trade.' },
    };
  }

  const existingTrade = await prisma.trade.findFirst({
    where: {
      offerId: validatedFields?.data.offerId,
      buyerId: validatedFields?.data.buyerId,
      sellerId: validatedFields?.data.sellerId,
      status: "PENDING"
    }
  })

  if(existingTrade){
    throw new Error("Existing trade between buyer and seller")
  }

  try {
      console.log(validatedFields.data);
      const trade = await prisma.trade.create({
        data: validatedFields.data
      })
      return {
        message: {
          severity: "success",
          message: 'Trade Created Successfully',
        },
        data: trade
      }
  } catch (error) {
    throw new Error("failed to create trade")
  }
}


export async function acceptTrade(tradeId: any) {
  try {
    const trade = await prisma.trade.findFirst({
      where: { id: tradeId }
    })
    await prisma.trade.update({
      where: { id: tradeId },
      data: { status: "ACCEPTED"}
    })
    revalidatePath(`/dashboard/trades/${tradeId}`)
    return {
      message: {
        severity: "success",
        message: 'Trade accepted successfully',
      },
      data: trade
    }
  } catch (error) {
    throw new Error("failed to accept trade")
  }
}

export async function declineTrade(tradeId: any) {
  const trade = await prisma.trade.findFirst({
    where: {id: tradeId}
  })
  try {
    await prisma.trade.update({
      where: {id: tradeId},
      data: {status: "DECLINED"}
    })
    revalidatePath(`/dashboard/trades/${tradeId}`)
    return {
      message: {
        severity: "success",
        message: 'Trade accepted successfully',
      },
      data: trade
    }
  } catch (error) {
    throw new Error("failed to decline trade")
  }
}

export async function cancelTrade(tradeId: string | undefined) {
  try {
    const trade = await prisma.trade.findFirst({
      where: {id: tradeId}
    })
    await prisma.trade.update({
      where: {id: tradeId},
      data: {status: "CANCELLED"}
    })
    if(trade){
      await prisma.payment.create({
        data: {
          userId: trade.buyerId,
          tradeId: trade?.id,
          amount: (trade?.valueInUSD ? (trade?.valueInUSD * trade?.rate) : 0),
          category: "Seller Cancelled. Refund to buyer"
        }
      })
    }
    await prisma.message.create({
      data: {
        message: `Seller has cancelled trade`,
        appMessage: true,
        resourceId: tradeId
      }
    })
    
    revalidatePath(`/dashboard/trades/${tradeId}`)
    return {
      message: {
        severity: "success",
        message: 'Trade cancelled successfully',
      }
    }
  } catch (error) {
    throw new Error("failed to cancel trade")
  }
}

export async function confirmTrade(tradeId: string | undefined) {
  try {
    const trade = await prisma.trade.findFirst({
      where: {id: tradeId}
    })
    // set trade status to successful
    await prisma.trade.update({
      where: {id: tradeId},
      data: {status: "SUCCESSFUL"}
    })
    if(trade){
      // create a payment for the seller
      await prisma.payment.create({
        data: {
          userId: trade.sellerId,
          tradeId: trade?.id,
          amount: (trade?.valueInUSD ? (trade?.valueInUSD * trade?.rate) : 0),
          category: "Payment for successful trade"
        }
      })
    }
    // send app message that buyer has confirmed trade
    await prisma.message.create({
      data: {
        message: `Buyer has confirmed trade`,
        appMessage: true,
        resourceId: tradeId
      }
    })
    
    revalidatePath(`/dashboard/trades/${tradeId}`)
    return {
      message: {
        severity: "success",
        message: 'Trade confirmed successfully',
      }
    }
  } catch (error) {
    throw new Error("failed to confirm trade")
  }
}


export async function sentGiftCard(tradeId: string | undefined) {
  try {
    const trade = await prisma.trade.update({
      where: {id: tradeId},
      data: {
        giftCardSent: true,
        timeSent: new Date().toISOString()  
      }
    })
    await prisma.message.create({
      data: {
        message: `Gift card sent by seller`,
        appMessage: true,
        resourceId: tradeId
      }
    })
    revalidatePath(`/dashboard/trades/${tradeId}`)
    return {
      message: {
        severity: "success",
        message: 'Trade updated successfully',
      }
    }
  } catch (error) {
    throw new Error("failed to update trade")
  }
}

// ---------------------------------------------------------- TRANSACTIONS --------------------------------------------------------

export const getTransferFee = async ({ amount }: { amount: number }) => {
  try {
    const details = {
      "amount": amount,
      "currency": "NGN",
    };
    const response = await flw.Transfer.fee(details)
    return response

  } catch (error: any) {
    throw new Error(error)
  }
}

export const generateTempAccount = async ({ email, tradeId, amount }: { email: string, tradeId: string, amount: number }) => {
  try {
    const details = {
      "email": email,
      "amount": amount,
      "is_permanent": false,
      "frequency": "3",
      "tx_ref": tradeId,
      "narration": "Peniga Escrow Account"
    };
    const tempAccountDetails = await flw.VirtualAcct.create(details)
    const transferFeeDetials = await getTransferFee({amount: amount})
    console.log(tempAccountDetails.data, transferFeeDetials.data)
    tempAccountDetails.data = {...tempAccountDetails.data, fee: transferFeeDetials.data[0].fee}
    await prisma.tempAccount.create({
      data: {
        tradeId: tradeId,
        accountDetails: tempAccountDetails?.data,
      }
    })
    
    revalidatePath(`/dashboard/trades/${tradeId}`)
    return tempAccountDetails.data

  } catch (error) {
    console.log(error)
  }
}


export const mockTransfer = async ({ amount }: { amount: number }) => {
  try {
    const Flutterwave = require('flutterwave-node-v3');
    const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
    const details = {
      account_bank: "flutterwave",
      account_number: "99992069",
      amount: 500,
      currency: "NGN",
      debit_currency: "NGN"
  };
    flw.Transfer.initiate(details)
      .then((res: any) =>{
        console.log("transfer response", res)
        return res
      })
      .catch((error: any) =>{
        console.log(error)
      });
  } catch (error) {
    console.log(error)
  }
}



// ----------------------------------------------------------ESCROW --------------------------------------------------------

/* export const createEscrow = async({userId, tradeId, amount}: {userId: string | undefined, tradeId: string | undefined, amount: number}) =>{
  const escrow = await prisma.escrow.create({
    data: {
      userId, tradeId, amount
    }
  })
  return escrow;
} */



// ----------------------------------------------------------DISPUTES --------------------------------------------------------


const CreateDisputeFormSchema = z.object({
  id: z.string(),
  userId: z.string(),
  tradeId: z.string(),
  buyerId: z.string(),
  sellerId: z.string(),
  reason: z.string(),
  mediaProof: z.string(),
  mediaProofType: z.string(),
});


export type CreateDisputeErrorState = {
  errors?: {
    reason?: string[];
    mediaProof?: string[];
    mediaProofType?: string[];
  };
  message?: {severity: string, message: string}
};
 
export async function createDispute(data: any) {
  
  try {

    const CreateDispute = CreateDisputeFormSchema.omit({ id: true });
    const validatedFields = CreateDispute.safeParse(data);

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: { severity: "error", message: 'Missing Fields. Failed to Create Dispute.' },
      };
    }

    const existingDispute = await prisma.dispute.findFirst({
      where: {
        tradeId: validatedFields?.data.tradeId,
      }
    })

    if (existingDispute) {
      throw new Error("Existing dispute between buyer and seller")
    }
    // create the dispute
    const dispute = await prisma.dispute.create({
      data: validatedFields.data
    })

    let user = await prisma.user.findFirst({
      where: {
        id: validatedFields?.data?.userId
      }
    })
    let trade = await prisma.trade.findFirst({
      where: {id: validatedFields?.data?.tradeId}
    })
    // app Message 1
    await prisma.message.create({
      data:{
        appMessage: true,
        resourceId: validatedFields?.data?.tradeId,
        resourceUrl: `/dashboard/trades/${validatedFields?.data?.tradeId}`,
        message: `${user?.firstName} ${user?.lastName} raised a Dispute`
      }
    })
    // app Message 2
    await prisma.message.create({
      data:{
        appMessage: true,
        resourceId: validatedFields?.data?.tradeId,
        resourceUrl: `/dashboard/trades/${validatedFields?.data?.tradeId}`,
        message: `Peniga Admin will respond to this case in under 24hrs`
      }
    })
    // Send plaintiff reason as message
    await prisma.message.create({
      data:{
        senderId: validatedFields?.data?.userId,
        receiverId: validatedFields?.data?.userId === trade?.buyerId ? trade?.sellerId : trade?.buyerId,
        resourceId: validatedFields?.data?.tradeId,
        resourceUrl: `/dashboard/trades/${validatedFields?.data?.tradeId}`,
        message: validatedFields?.data?.reason
      }
    })
    // Send plaintiff media proof as message
    await prisma.message.create({
      data:{
        senderId: validatedFields?.data?.userId,
        receiverId: validatedFields?.data?.userId === trade?.buyerId ? trade?.sellerId : trade?.buyerId,
        resourceId: validatedFields?.data?.tradeId,
        resourceUrl: `/dashboard/trades/${validatedFields?.data?.tradeId}`,
        message: validatedFields?.data?.mediaProof
      }
    })
    // Set trade status to disputed
    await prisma.trade.update({
      where: {id: data?.tradeId},
      data: {status: "DISPUTED"}
    })
    revalidatePath(`/dashboard/trades/${validatedFields?.data?.tradeId}`)
    return {
      message: {
        severity: "success",
        message: 'Dispute Created Successfully',
      },
      data: dispute
    }
  } catch (error) {
    throw new Error("failed to create dispute")
  }
}


export async function refundBuyer(tradeId: any) {
  
  const dispute = await prisma.dispute.findFirst({
    where: {tradeId}
  })
  const trade = await prisma.trade.findFirst({
    where: {id: tradeId}
  })
  const buyer = await prisma.user.findFirst({
    where: {id: trade?.buyerId}
  })
  try {
    // create a payment for the buyer
    if(trade){
      await prisma.payment.create({
        data: {
          userId: trade?.buyerId,
          tradeId: trade?.id,
          amount: (trade?.valueInUSD ? (trade?.valueInUSD * trade?.rate) : 0),
          category: "Buyer refunded after winning dispute"
        }
      })
    }
    
    // set dispute status to RESOLVED
    await prisma.dispute.update({
      where: {id: dispute?.id},
      data: {
        disputeWinnerId: dispute?.buyerId,
        status: "RESOLVED"
      }
    })
    // app Message 1
    await prisma.message.create({
      data:{
        appMessage: true,
        resourceId: tradeId,
        resourceUrl: `/dashboard/trades/${tradeId}`,
        message: `Admin has ruled in favour of Buyer (${buyer?.firstName} ${buyer?.lastName})`
      }
    })
    // app Message 2
    await prisma.message.create({
      data:{
        appMessage: true,
        resourceId: tradeId,
        resourceUrl: `/dashboard/trades/${tradeId}`,
        message: `Funds in escrow will be refunded to buyer`
      }
    })
    revalidatePath(`/dashboard/disputes/${dispute?.id}`)
    return {
      message: {
        severity: "success",
        message: 'Buyer refunded successfully',
      },
    }
  } catch (error) {
    throw new Error("failed to refund buyer")
  }
}


export async function creditSeller(tradeId: any) {
  
  const dispute = await prisma.dispute.findFirst({
    where: {tradeId}
  })
  const trade = await prisma.trade.findFirst({
    where: {id: tradeId}
  })
  const seller = await prisma.user.findFirst({
    where: {id: trade?.sellerId}
  })
  try {
    // credit seller wallet here
    if(trade){
      await prisma.payment.create({
        data: {
          userId: trade?.sellerId,
          tradeId: trade?.id,
          amount: (trade?.valueInUSD ? (trade?.valueInUSD * trade?.rate) : 0),
          category: "Seller credited after winning dispute"
        }
      })
    }

    // set dispute status to RESOLVED
    await prisma.dispute.update({
      where: {id: dispute?.id},
      data: {
        disputeWinnerId: dispute?.sellerId,
        status: "RESOLVED"
      }
    })
    // app Message 1
    await prisma.message.create({
      data:{
        appMessage: true,
        resourceId: tradeId,
        resourceUrl: `/dashboard/trades/${tradeId}`,
        message: `Admin has ruled in favour of Seller (${seller?.firstName} ${seller?.lastName})`
      }
    })
    // app Message 2
    await prisma.message.create({
      data:{
        appMessage: true,
        resourceId: tradeId,
        resourceUrl: `/dashboard/trades/${tradeId}`,
        message: `Funds in escrow will be credited to seller`
      }
    })
    revalidatePath(`/dashboard/disputes/${dispute?.id}`)
    return {
      message: {
        severity: "success",
        message: 'Seller refunded successfully',
      },
    }
  } catch (error) {
    throw new Error("failed to refund seller")
  }
}










// ----------------------------------------------------------MESSAGES --------------------------------------------------------

const SendMessageFormSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  appMessage: z.boolean(),
  resourceId: z.string(),
  resourceUrl: z.string(),
  message: z.string(),
});


export type SendMessageErrorState = {
  errors?: {
    senderId?: string[];
    receiverId?: string[];
    appMessage?: boolean;
    resourceId?: string[];
    resourceUrl?: string[];
    message?: string[];
  };
  message?: {severity: string, message: string}
};
 
export async function createMessage(data: any) {
  const CreateMessage = SendMessageFormSchema.omit({ id: true, ...(data?.appMessage && {senderId: true, receiverId: true})});
  const validatedFields = CreateMessage.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: {severity: "error", message: 'Missing Fields. Failed to Create Message.' },
    };
  }
  try {
      const message = await prisma.message.create({
        data: validatedFields.data
      })
      revalidatePath(data?.resourceUrl);
      return {
        message: {
          severity: "success",
          message: 'Message Created Successfully',
        },
      }
  } catch (error) {
    throw new Error("failed to create message")
  }
}

export async function refreshPage(pathname: string){
  revalidatePath(pathname);
}
