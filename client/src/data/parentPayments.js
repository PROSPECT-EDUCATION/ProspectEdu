export const parentPayments = {
  1: {
    // Child: Aarav
    summary: {
      total: 45000,
      paid: 30000,
      pending: 15000,
      nextDue: "15 March 2025",
    },

    feeBreakdown: [
      {
        title: "Tuition Fees (Q1)",
        amount: 10000,
        status: "Paid",
        due: "10 April",
        receipt: "receipt1.pdf",
      },
      {
        title: "Tuition Fees (Q2)",
        amount: 10000,
        status: "Pending",
        due: "10 July",
      },
      {
        title: "Transport Fees",
        amount: 4000,
        status: "Paid",
        due: "1 June",
        receipt: "receipt-transport.pdf",
      },
      {
        title: "Exam Fees",
        amount: 1500,
        status: "Pending",
        due: "20 August",
      },
    ],

    history: [
      {
        date: "10 April 2025",
        amount: 10000,
        status: "success",
      },
      {
        date: "1 June 2025",
        amount: 4000,
        status: "success",
      },
    ],
  },

  2: {
    // Child: Sneha
    summary: {
      total: 55000,
      paid: 20000,
      pending: 35000,
      nextDue: "10 April 2025",
    },

    feeBreakdown: [
      {
        title: "Tuition Fees (Q1)",
        amount: 8000,
        status: "Paid",
        due: "15 April",
        receipt: "receipt2.pdf",
      },
      {
        title: "Lab Fees",
        amount: 5000,
        status: "Pending",
        due: "20 May",
      },
      {
        title: "Sports Fees",
        amount: 3000,
        status: "Pending",
        due: "10 June",
      },
      {
        title: "Transport Fees",
        amount: 4000,
        status: "Pending",
        due: "12 June",
      },
    ],

    history: [
      {
        date: "12 Feb 2025",
        amount: 8000,
        status: "success",
      },
      {
        date: "20 March 2025",
        amount: 5000,
        status: "failed",
      },
    ],
  },
};
