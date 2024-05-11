import { sql } from '@vercel/postgres';
import {prisma} from '@/app/lib/prisma';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import axios from 'axios';
import { auth } from '@/auth';



const getAccessToken = async () => {
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
}

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

export async function getUserWallet(email: string | null | undefined) {
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
}



// --------------------------------- WALLET -----------------------------------------------

export async function getWalletBalance(accountNumber: string | null | undefined) {
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
}

export async function getBanks() {
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
}

export async function fetchTransactions(data: {accountNuber: string, pageSize: number, pageNo: number}) {
  
  try {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email);
    let accessToken = await getAccessToken();
    if(data?.accountNuber){
      const res = await axios({
        method: 'get',
        url: `${process.env.MONNIFY_BASE_URL}/disbursements/wallet/transactions?accountNumber=${data?.accountNuber}&pageSize=${data?.pageSize || 20}&pageNumber=${data?.pageNo || 1}`,
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
}


export async function getTotalEscrows(userId: string | undefined){
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
}

export async function getUserBalance (buyerId: string | undefined){
  try {
    const buyer = await prisma.user.findFirst({
      where: {id: buyerId},
      include: {
        wallet: true
      }
    })
    const buyerEscrows = await getTotalEscrows(buyerId);
    const buyerWalletBalance: {availableBalance: number, ledgerBalance: number} = await getWalletBalance(buyer?.wallet?.walletData?.accountNumber);
    buyerWalletBalance.availableBalance = buyerWalletBalance.availableBalance - buyerEscrows
    return buyerWalletBalance ;
  } catch (error) {
    console.log(error);
  }
}






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
      dispute: true
    }
  })
  return trade;
}

export async function getAllTrades(filterData: {userId: string | undefined}) {
  const trades = await prisma.trade.findMany({
    where: {
      OR: [
        {buyerId: filterData?.userId},
        {sellerId: filterData?.userId}
      ]
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


// --------------------------------- MESSAGES -----------------------------------------------

export async function getMessages(resourceId: string) {
  const messages = await prisma.message.findMany({
    where: {resourceId },
  })
  return messages;
}


// --------------------------------- DISPUTE -----------------------------------------------

export async function getDisputeById(id: string | null | undefined) {
  const dispute = await prisma.dispute.findFirst({
    where: {...(id && {id}) }
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
        select: { buyer: true, seller: true, valueInUSD: true, rate: true, }
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

export async function getAllEscrows(userId: string | undefined) {
  const escrows = await prisma.escrow.findMany({
    where: {userId},
    include: {
      trade: {
        select: {
          seller: true
        }
      }
    }
  })
  return escrows;
}

// --------------------------------- TRANSACTION -----------------------------------------------

export async function getTransactionById(id: string | null | undefined) {
  const transaction = await prisma.transaction.findFirst({
    where: {...(id && {id}) }
  })
  return transaction;
}

export async function getAllTransactions({}: any) {
  const transaction = await prisma.transaction.findMany({
    where: {}
  })
  return transaction;
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


























export async function fetchRevenue() {
  
  // Add noStore() here to prevent the response from being cached.
  noStore()
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore()
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore()
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    //throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore()
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  noStore()
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore()
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  noStore()
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
